import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/types/create-resume";
import { withAuth } from "@/utils/withAuth";
import { User } from "@prisma/client";
import { FileText, PlusSquare } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import CreateResumeButton from "./_components/CreateResumeButton";
import ResumeItem from "./_components/ResumeItem";

export const metadata: Metadata = {
  title: "My Resumes",
};

export default withAuth(async function Page({ user }: { user: User }) {
  const [resumes, totalCount] = await Promise.all([
    prisma.resume.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: resumeDataInclude,
    }),
    prisma.resume.count({
      where: {
        userId: user.id,
      },
    }),
  ]);

  return (
    <main className="w-full px-3 py-6 mx-auto space-y-6 max-w-7xl">
      {resumes.length === 0 ? (
        <div className="flex h-[60vh] flex-col items-center justify-center space-y-4 text-center">
          <FileText size={64} />
          <p className="text-lg font-semibold">
            You don&apos;t have any resumes yet
          </p>
          <p className="text-sm text-muted-foreground">
            Create a new resume to get started
          </p>
          <Button asChild className="flex gap-2 mx-auto w-fit">
            <Link href="/create-resume">
              <PlusSquare size={16} />
              Create A New Resume
            </Link>
          </Button>
        </div>
      ) : (
        <>
          <CreateResumeButton canCreate={totalCount < 5} />
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Your Resumes</h1>
            <p className="text-sm text-muted-foreground">
              Resume count: {totalCount}
            </p>
          </div>
          <div className="flex flex-col w-full grid-cols-2 gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
            {resumes.map((resume, idx) => {
              const untitledIndex = resumes
                .slice(0, idx + 1)
                .filter((r) => !r.title).length;
              return (
                <ResumeItem
                  key={resume.id}
                  resume={resume}
                  untitledIndex={untitledIndex}
                />
              );
            })}
          </div>
        </>
      )}
    </main>
  );
});
