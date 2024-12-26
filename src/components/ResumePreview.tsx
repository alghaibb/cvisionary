import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/schemas";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "date-fns";
import { Badge } from "./ui/badge";
import { BorderStyles } from "@/app/(main)/create-resume/_components/BorderStyle";

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
    colorHex,
    borderStyle,
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
          style={{
            borderRadius:
              borderStyle === BorderStyles.SQUARE
                ? "0px"
                : borderStyle === BorderStyles.CIRCLE
                  ? "9999px"
                  : "10%",
          }}
        />
      )}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <p
            className="text-3xl font-bold"
            style={{ color: colorHex, border: borderStyle }}
          >
            {firstName} {lastName}
          </p>

          <p className="font-medium" style={{ color: colorHex }}>
            {jobTitle}
          </p>
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
  const { summary, colorHex, borderStyle } = resumeData;

  if (!summary) return null;

  return (
    <>
      <hr style={{ borderColor: colorHex }} className="border-2" />
      <div className="space-y-3 break-inside-avoid">
        <p
          className="text-lg font-semibold"
          style={{ color: colorHex, border: borderStyle }}
        >
          Professional Summary
        </p>
        <div className="text-sm text-justify break-words whitespace-pre-line max-w-prose">
          {summary}
        </div>
      </div>
    </>
  );
}

function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences, colorHex, borderStyle } = resumeData;

  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0,
  );

  if (!workExperiencesNotEmpty?.length) return null;

  return (
    <>
      <hr style={{ borderColor: colorHex }} className="border-2" />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          style={{ color: colorHex, border: borderStyle }}
        >
          Work Experience
        </p>
        <div className="space-y-3 text-sm text-justify break-words whitespace-pre-line">
          {workExperiencesNotEmpty.map((exp, index) => (
            <div key={index} className="space-y-1 break-inside-avoid">
              <div className="flex justify-between text-sm font-semibold">
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
  const { educations, colorHex } = resumeData;

  const educationsNotEmpty = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0,
  );

  if (!educationsNotEmpty?.length) return null;
  return (
    <>
      <hr style={{ borderColor: colorHex }} className="border-2" />
      <div className="space-y-3">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Education
        </p>
        {educationsNotEmpty.map((edu, index) => (
          <div key={index} className="space-y-1 break-inside-avoid">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>{edu.degree}</span>
              {edu.startDate && (
                <span>
                  {formatDate(edu.startDate, "MM/yyyy")} -{" "}
                  {edu.endDate ? formatDate(edu.endDate, "MM/yyyy") : "Present"}
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
  const { skills, colorHex, borderStyle } = resumeData;

  if (!skills) return null;

  return (
    <>
      <hr style={{ borderColor: colorHex }} className="border-2" />
      <div className="space-y-3 break-inside-avoid">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Skills
        </p>
        <div className="flex flex-wrap gap-2 break-inside-avoid">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              className="text-white bg-black hover:bg-black"
              style={{
                backgroundColor: colorHex,
                borderRadius:
                  borderStyle === BorderStyles.SQUARE
                    ? "0px"
                    : borderStyle === BorderStyles.CIRCLE
                      ? "9999px"
                      : "8px",
              }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}
