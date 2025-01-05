import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/lib/prisma";

interface LoadingProps {
  userId: string;
}

export default async function Loading({ userId }: LoadingProps) {
  const count = await prisma.resume.count({
    where: {
      userId,
    },
  });

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6">
      {/* Create Button */}
      <div className="mb-4 flex justify-center">
        <Skeleton className="h-12 w-56 rounded-lg" />
      </div>

      {/* Skeleton Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: count || 8 }).map((_, idx) => (
          <div
            key={idx}
            className="group relative rounded-lg border border-transparent bg-secondary p-4 shadow-sm transition-transform hover:scale-105 hover:border-border"
          >
            {/* Title */}
            <Skeleton className="mb-2 h-6 w-3/4 rounded-md" />

            {/* Description */}
            <Skeleton className="mb-3 h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />

            {/* Preview */}
            <Skeleton
              className="mt-4 w-full rounded-lg"
              style={{ aspectRatio: "210 / 297" }}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
