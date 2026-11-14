import { Skeleton } from "@/components/ui/skeleton";

const cards = Array.from(
  { length: 6 },
  (_, index) => `event-card-skeleton-${index}`,
);

export default function Loading() {
  return (
    <section className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <Skeleton className="h-12 w-72 max-w-full sm:h-14" />
          <Skeleton className="h-5 w-full max-w-2xl" />
          <Skeleton className="h-1 w-24 rounded-full" />
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((id) => (
            <div
              key={id}
              className="flex h-full flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-md"
            >
              <Skeleton className="h-52 w-full rounded-none" />
              <div className="flex flex-grow flex-col p-5">
                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="mb-1 h-4 w-full" />
                <Skeleton className="mb-4 h-4 w-5/6" />
                <div className="mb-4 space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
                <Skeleton className="mt-auto h-10 w-full rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
