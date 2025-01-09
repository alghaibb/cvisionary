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
import { getUserSubscription } from "@/utils/subscription";
import { canCreateResume } from "@/utils/permissions";

export const metadata: Metadata = {
  title: "My Resumes",
};

export default withAuth(async function Page({ user }: { user: User }) {
  const [resumes, totalCount, subscriptionPlan] = await Promise.all([
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
    getUserSubscription(user.id),
  ]);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      {resumes.length === 0 ? (
        <div className="flex h-[60vh] flex-col items-center justify-center space-y-4 text-center">
          <FileText size={64} />
          <p className="text-lg font-semibold">
            You don&apos;t have any resumes yet
          </p>
          <p className="text-sm text-muted-foreground">
            Create a new resume to get started
          </p>
          <Button asChild className="mx-auto flex w-fit gap-2">
            <Link href="/create-resume">
              <PlusSquare size={16} />
              Create A New Resume
            </Link>
          </Button>
        </div>
      ) : (
        <>
          <CreateResumeButton
            canCreate={canCreateResume(subscriptionPlan, totalCount)}
          />
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Your Resumes</h1>
            <p className="text-sm text-muted-foreground">
              Resume count: {totalCount}
            </p>
          </div>
          <div className="flex w-full grid-cols-2 flex-col gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
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
