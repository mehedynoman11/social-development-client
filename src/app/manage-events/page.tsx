import { Plane, Ticket } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import DeleteDialogPage from "@/components/DeleteDialog";
import EditDialogPage from "@/components/EditDialog";
import UpcomingEventCard from "@/components/UpcomingEventCard";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import type { IUpcomingEvent } from "../upcoming-event/page";

const ManageEventPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <Ticket className="size-12 text-muted-foreground" />
        <h2 className="text-2xl font-bold">Please Login First</h2>
        <p className="text-muted-foreground">Login to view your events.</p>
        <Link
          href="/signin"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Login Now
        </Link>
      </div>
    );
  }

  const res = await fetch(
   `${process.env.SERVER_URL}/manage-events/${encodeURIComponent(user.email)}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error(`Failed to load your events (${res.status}).`);
  }

  const events: IUpcomingEvent[] = await res.json();

  if (!Array.isArray(events)) {
    throw new Error("The events API returned an invalid response.");
  }

  return (
    <section className="container mx-auto min-h-screen px-4 py-12">
      <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <Badge variant="secondary" className="mb-3 gap-2 px-3 py-1">
            <Plane className="size-3" />
            My Events
          </Badge>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            My Events
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage and view your events.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
          <div className="rounded-lg bg-primary/10 p-3">
            <Ticket className="size-6 text-primary" />
          </div>

          <div>
            <p className="text-2xl font-bold">{events.length}</p>
            <p className="text-xs text-muted-foreground">
              {events.length === 1 ? "Total event" : "Total events"}
            </p>
          </div>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="rounded-xl border border-dashed py-16 text-center">
          <p className="text-lg font-medium">
            You haven’t created any events yet.
          </p>
          <Link
            href="/create-event"
            className="mt-4 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Create an event
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div key={event._id}>
              <UpcomingEventCard event={event} />
              <div className="flex gap-3">
                <EditDialogPage event={event} />
                <DeleteDialogPage _id={event._id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ManageEventPage;
