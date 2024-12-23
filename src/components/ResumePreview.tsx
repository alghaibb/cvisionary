import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/schemas";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Separator } from "./ui/separator";
import { formatDate } from "date-fns";
import { Badge } from "./ui/badge";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function ResumePreview({
  resumeData,
  className,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-black",
        className,
      )}
      ref={containerRef}
    >
      <div
        style={{ zoom: (1 / 794) * width }}
        className={cn("space-y-6 p-6", !width && "invisible")}
      >
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <WorkExperienceSection resumeData={resumeData} />
        <EducationSection resumeData={resumeData} />
        <SkillsSection resumeData={resumeData} />
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
}

function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const {
    resumePhoto,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email,
  } = resumeData;

  const [photoSrc, setPhotoSrc] = useState(
    resumePhoto instanceof File ? "" : resumePhoto,
  );

  useEffect(() => {
    const objectUrl =
      resumePhoto instanceof File ? URL.createObjectURL(resumePhoto) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (resumePhoto === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [resumePhoto]);

  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt="Resume photo"
          className="object-cover aspect-square"
        />
      )}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <p className="text-3xl font-bold">
            {firstName} {lastName}
          </p>

          <p className="font-medium">{jobTitle}</p>
        </div>

        <p className="text-xs text-gray-500">
          {city}
          {city && country ? ", " : ""}
          {country}
          {(city || country) && (phone || email) ? " • " : ""}
          {[phone, email].filter(Boolean).join(" • ")}
        </p>
      </div>
    </div>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary } = resumeData;

  if (!summary) return null;

  return (
    <>
      <Separator />
      <div className="space-y-3 break-inside-avoid">
        <p className="text-lg font-semibold">Professional Summary</p>
        <div className="text-sm text-justify break-words whitespace-pre-line max-w-prose">
          {summary}
        </div>
      </div>
    </>
  );
}

function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences } = resumeData;

  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0,
  );

  if (!workExperiencesNotEmpty?.length) return null;

  return (
    <>
      <Separator />
      <div className="space-y-3">
        <p className="text-lg font-semibold">Work Experience</p>
        <div className="space-y-3 text-sm text-justify break-words whitespace-pre-line max-w-prose">
          {workExperiencesNotEmpty.map((exp, index) => (
            <div key={index} className="space-y-1 break-inside-avoid">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>{exp.position}</span>
                {exp.startDate && (
                  <span>
                    {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                    {exp.endDate
                      ? formatDate(exp.endDate, "MM/yyyy")
                      : "Present"}
                  </span>
                )}
              </div>

              <p className="text-xs font-semibold">{exp.company}</p>
              <div className="text-sm text-justify break-words whitespace-pre-line max-w-prose">
                {exp.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function EducationSection({ resumeData }: ResumeSectionProps) {
  const { educations } = resumeData;

  const educationsNotEmpty = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0,
  );

  if (!educationsNotEmpty?.length) return null;
  return (
    <>
      <Separator />
      <div className="space-y-3">
        <p className="text-lg font-semibold">Education</p>
        {educationsNotEmpty.map((edu, index) => (
          <div key={index} className="space-y-1 break-inside-avoid">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>{edu.degree}</span>
              {edu.startDate && (
                <span>
                  {`${formatDate(edu.startDate, "MM/yyyy")} ${
                    edu.endDate ? `- ${formatDate(edu.endDate, "MM/yyyy")}` : ""
                  }`}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{edu.school}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills } = resumeData;

  if (!skills) return null;

  return (
    <>
      <Separator />
      <div className="space-y-3 break-inside-avoid">
        <p className="text-lg font-semibold">Skills</p>
        <div className="flex flex-wrap gap-2 break-inside-avoid">
          {skills.map((skill, index) => (
            <Badge key={index} className="text-white bg-black hover:bg-black">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}
