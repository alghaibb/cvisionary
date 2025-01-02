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
}

export default function ResumeItem({ resume }: ResumeItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: resume.title || "Untitled Resume",
  });

  const wasUpdated = resume.updatedAt !== resume.createdAt;

  return (
    <div className="relative p-3 transition-transform transform border border-transparent group bg-secondary hover:scale-105 hover:border-border">
      <div className="space-y-3">
        <Link
          href={`create-resume?resumeId=${resume.id}`}
          className="inline-block w-full text-center"
        >
          <p className="font-semibold line-clamp-1 group-hover:text-primary">
            {resume.title || "Untitled Resume"}
          </p>

          {resume.description && (
            <p className="text-sm line-clamp-2">{resume.description}</p>
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
            className="overflow-hidden transition-shadow shadow-sm group-hover:shadow-lg"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </Link>
      </div>
      <MoreMenu resumeId={resume.id} onPrintClick={reactToPrintFn} />
    </div>
  );
}
