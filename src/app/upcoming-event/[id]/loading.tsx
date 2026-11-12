import { Skeleton } from "@/components/ui/skeleton";

const detailRows = Array.from(
  { length: 3 },
  (_, index) => `detail-row-skeleton-${index}`,
);
const paragraphLines = Array.from(
  { length: 4 },
  (_, index) => `paragraph-line-skeleton-${index}`,
);

export default function Loading() {
  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Skeleton className="mb-6 h-10 w-40" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Skeleton className="h-64 w-full rounded-2xl sm:h-96" />

            <div>
              <Skeleton className="h-10 w-4/5" />

              <div className="mt-4 flex flex-wrap gap-4">
                <Skeleton className="h-4 w-44" />
                <Skeleton className="h-4 w-36" />
              </div>

              <Skeleton className="my-6 h-px w-full" />

              <Skeleton className="mb-4 h-6 w-48" />

              <div className="space-y-2">
                {paragraphLines.map((id) => (
                  <Skeleton key={id} className="h-4 w-full" />
                ))}
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="space-y-5 rounded-xl bg-white p-6 shadow-md ring-1 ring-foreground/10">
              <Skeleton className="h-6 w-40" />

              {detailRows.map((id) => (
                <div key={id} className="flex items-start gap-3">
                  <Skeleton className="size-5 shrink-0 rounded-full" />
                  <div className="w-full space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </div>
              ))}

              <Skeleton className="h-px w-full" />
              <Skeleton className="h-12 w-full rounded-lg" />

              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
