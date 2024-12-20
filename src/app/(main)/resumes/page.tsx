import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { withAuth } from "@/utils/withAuth";
import { User } from "@prisma/client";
import { PlusSquare, FileText } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Resumes",
};

export default withAuth(async function Page({ user }: { user: User }) {
  const resumes = await prisma.resume.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      title: true,
    },
  });

  const hasResumes = resumes.length > 0;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      {!hasResumes ? (
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <FileText className="h-12 w-12 text-muted-foreground" />
          <h2 className="text-xl font-semibold">No Resumes Found</h2>
          <p className="text-sm text-muted-foreground">
            It looks like you haven&apos;t created any resumes yet. Start by
            creating your first one!
          </p>
          <Button variant="shine" asChild>
            <Link href="/create-resume">
              <PlusSquare size={16} className="mr-2" />
              Create New Resume
            </Link>
          </Button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold">Your Resumes</h2>
          <ul className="mt-4 space-y-3">
            {resumes.map((resume) => (
              <li
                key={resume.id}
                className="flex items-center justify-between rounded-lg border p-4 shadow-sm hover:shadow-md"
              >
                <span>{resume.title}</span>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/resumes/${resume.id}`}>View</Link>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
});
