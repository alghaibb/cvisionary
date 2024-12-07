import { Skeleton } from "@/components/ui/skeleton";

export function VerifyMagicLinkSkeleton() {
  return (
    <div className="space-y-6 px-4 py-6">
      {/* Skeleton for alert heading and description */}
      <Skeleton className="mx-auto h-6 w-3/4" />
      <Skeleton className="mx-auto h-4 w-2/3" />

      {/* Skeleton for separator */}
      <Skeleton className="h-px w-full" />

      {/* Skeleton for buttons */}
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-48" />
      </div>
    </div>
  );
}
