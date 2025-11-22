import { cn } from "@/utils/cn";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-gray-200 animate-pulse rounded", className)}
      {...props}
    />
  );
}

function SkeletonLine({ width = "w-full" }: { width?: string }) {
  return <Skeleton className={`h-4 ${width}`} />;
}

function SkeletonImage({ width = "w-32", height = "h-20" }: { width?: string; height?: string }) {
  return <Skeleton className={`${width} ${height} rounded-lg`} />;
}

function LessonSkeleton() {
  return (
    <div className="relative mx-auto flex h-full w-full flex-col">
      <div className="scrollbar-hide mx-auto flex w-full max-w-4xl flex-1 flex-col items-center gap-4 overflow-auto px-6 py-10">
      <div className="flex justify-center mb-4 w-full"><SkeletonLine width="w-3/4 h-6" /></div>
        <Skeleton className="h-8 w-64 rounded-lg" />
        <div className="w-full space-y-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <SkeletonLine width="w-full" />
              <SkeletonLine width="w-5/6" />
              <SkeletonLine width="w-4/5" />
              <SkeletonLine width="w-3/4" />
              <SkeletonLine width="w-full" />
              <SkeletonLine width="w-2/3" />
            </div>
          </div>
          <div className="space-y-4">
            <SkeletonImage width="sm:w-1/2 w-2/3" height="sm:h-56 h-32" />
            <div className="space-y-3">
              <SkeletonLine width="w-4/5" />
              <SkeletonLine width="w-full" />
              <SkeletonLine width="w-3/5" />
              <SkeletonLine width="w-5/6" />
              <SkeletonLine width="w-2/3" />
              <SkeletonLine width="w-4/5" />
              <SkeletonLine width="w-1/2" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-3">
              <SkeletonLine width="w-full" />
            <SkeletonImage width="sm:w-1/2 w-2/3" height="sm:h-56 h-32" />
              <SkeletonLine width="w-3/4" />
              <SkeletonLine width="w-5/6" />
              <SkeletonLine width="w-2/3" />
              <SkeletonLine width="w-4/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WikiSidebarSkeleton() {
  return (
    <div className="h-full w-full space-y-4 overflow-x-hidden">
      <SkeletonLine width="w-full h-10 mb-8" />
      <SkeletonLine width="w-full h-6" />
      <SkeletonLine width="w-full ml-4" />
      <SkeletonLine width="w-full ml-4" />
      <SkeletonLine width="w-full ml-4" />
      <SkeletonLine width="w-full h-6" />
      <SkeletonLine width="w-full ml-4" />
      <SkeletonLine width="w-full ml-4" />
      <SkeletonLine width="w-full h-6" />
      <SkeletonLine width="w-full ml-4" />
    </div>
  );
}

function WikiSectionContentSkeleton() {
  return (
    <div className="w-full space-y-4">
      {Array.from({ length: 15 }).map((_, index) => (
        <SkeletonLine width="w-full h-6" key={index} />
      ))}
    </div>
  );
}

export { Skeleton, SkeletonLine, SkeletonImage, LessonSkeleton, WikiSidebarSkeleton, WikiSectionContentSkeleton };
