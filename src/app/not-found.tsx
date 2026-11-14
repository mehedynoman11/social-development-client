import Link from "next/link";
import { Compass } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100svh-4rem)] flex-1 items-center justify-center bg-background px-4 py-20">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="relative mb-8 flex size-32 items-center justify-center">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[#C9F2E9] dark:bg-emerald-900/40"
          />
          <Compass
            aria-hidden="true"
            className="relative z-10 size-16 text-foreground"
            strokeWidth={1.5}
          />
        </div>

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-balance md:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className={buttonVariants({
              size: "lg",
              className: "rounded-full px-6",
            })}
          >
            Back to home
          </Link>
          <Link
            href="/upcoming-event"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "rounded-full px-6",
            })}
          >
            Browse events
          </Link>
        </div>
      </div>
    </section>
  );
}
