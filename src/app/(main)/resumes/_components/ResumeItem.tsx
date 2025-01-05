"use client";

import ResumePreview from "@/components/ResumePreview";
import { ResumeServerData } from "@/types/create-resume";
import { mapToResumeValues } from "@/utils/resume/mapToResumeValues";
import { formatDate } from "date-fns";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Link from "next/link";
import MoreMenu from "./MoreMenu";

interface ResumeItemProps {
  resume: ResumeServerData;
  untitledIndex: number;
}

export default function ResumeItem({ resume, untitledIndex }: ResumeItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: resume.title || `Untitled Resume ${untitledIndex}`,
  });

  const wasUpdated = resume.updatedAt !== resume.createdAt;

  const displayTitle = resume.title || `Untitled Resume ${untitledIndex}`;

  return (
    <div className="group relative transform border border-transparent bg-secondary p-3 transition-transform hover:border-border">
      <div className="space-y-3">
        <Link
          href={`create-resume?resumeId=${resume.id}`}
          className="inline-block w-full text-center"
        >
          <p className="line-clamp-1 font-semibold group-hover:text-primary">
            {displayTitle}
          </p>

          {resume.description && (
            <p className="line-clamp-2 text-sm">{resume.description}</p>
          )}

          <p className="text-xs text-muted-foreground">
            {wasUpdated ? "Updated" : "Created"} on{" "}
            {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
          </p>
        </Link>

        <Link
          href={`create-resume?resumeId=${resume.id}`}
          className="relative inline-block w-full"
        >
          <ResumePreview
            resumeData={mapToResumeValues(resume)}
            contentRef={contentRef}
            className="overflow-hidden shadow-sm transition-shadow group-hover:shadow-lg"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </Link>
      </div>
      <MoreMenu resumeId={resume.id} onPrintClick={reactToPrintFn} />
    </div>
  );
}
