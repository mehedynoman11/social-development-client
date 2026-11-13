"use client";

import { CalendarCheck, Ticket } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import UpcomingEventCard from "@/components/UpcomingEventCard";
import { Badge } from "@/components/ui/badge";
import { EventContext } from "@/context/eventContext";

const JoinedEventPage = () => {
  const { addEvent: joinedEvents } = useContext(EventContext);

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <Badge variant="secondary" className="mb-3 gap-2 px-3 py-1">
              <CalendarCheck className="size-3" />
              Joined Events
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Events You&apos;re Attending
            </h1>
            <p className="mt-2 text-muted-foreground">
              View the events you&apos;ve joined.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <Ticket className="size-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{joinedEvents.length}</p>
              <p className="text-xs text-muted-foreground">
                {joinedEvents.length === 1 ? "Joined event" : "Joined events"}
              </p>
            </div>
          </div>
        </div>

        {joinedEvents.length === 0 ? (
          <div className="rounded-xl border border-dashed bg-white py-16 text-center">
            <p className="text-lg font-medium">
              You haven&apos;t joined any events yet.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Browse upcoming events and join one to see it here.
            </p>
            <Link
              href="/upcoming-event"
              className="mt-4 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Browse events
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {joinedEvents.map((event) => (
              <UpcomingEventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JoinedEventPage;
