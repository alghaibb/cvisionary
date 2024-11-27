import { Skeleton } from "@/components/ui/skeleton";

export function ResetPasswordSkeleton() {
  return (
    <div className="space-y-6 px-4 py-6">
      {/* Skeleton for heading */}
      <Skeleton className="mx-auto h-6 w-3/4" />
      <Skeleton className="mx-auto h-4 w-1/2" />

      {/* Skeleton for password fields */}
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />

      {/* Skeleton for buttons */}
      <div className="mt-4 flex space-x-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}
