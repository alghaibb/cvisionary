import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { getSession } from "@/utils/session";
import Link from "next/link";
import { FileText, PlusSquare } from "lucide-react";

export default async function Loading() {
  const session = await getSession();
  const userId = session?.user?.id;

  const count = await prisma.resume.count({
    where: {
      userId,
    },
  });

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6">
      {count === 0 ? (
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
          {/* Skeleton for "Create Resume" Button */}
          <div className="mb-4 flex justify-center">
            <Skeleton className="h-12 w-56 rounded-lg" />
          </div>

          {/* Skeleton Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: count }).map((_, idx) => (
              <div
                key={idx}
                className="group relative rounded-lg border border-transparent bg-secondary p-4 shadow-sm transition-transform hover:scale-105 hover:border-border"
              >
                <Skeleton className="mb-2 h-6 w-3/4 rounded-md" />

                <Skeleton className="mb-3 h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-5/6 rounded-md" />

                <Skeleton
                  className="mt-4 w-full rounded-lg"
                  style={{ aspectRatio: "210 / 297" }}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
