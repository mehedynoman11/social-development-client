"use client";

import {
  CalendarPlus,
  CalendarCheck,
  ChevronRight,
  ListChecks,
  LogOut,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";

const actions = [
  {
    href: "/create-event",
    title: "Create event",
    description: "Host something new for the community",
    icon: CalendarPlus,
  },
  {
    href: "/manage-events",
    title: "Manage events",
    description: "Edit or remove events you created",
    icon: ListChecks,
  },
  {
    href: "/joined-event",
    title: "Joined events",
    description: "See the events you are attending",
    icon: CalendarCheck,
  },
];

function AccountRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="break-all text-sm font-medium">{value}</dd>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 space-y-2">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="h-64 w-full rounded-2xl" />
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Skeleton className="h-64 rounded-2xl lg:col-span-2" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    </div>
  );
}

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("Signed out successfully");
  };

  if (isPending) {
    return <ProfileSkeleton />;
  }

  if (!user) {
    return (
      <div className="container mx-auto flex max-w-6xl items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md rounded-2xl text-center">
          <CardHeader>
            <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-muted">
              <UserRound className="size-6 text-muted-foreground" />
            </div>
            <CardTitle className="text-lg">You&apos;re not signed in</CardTitle>
            <CardDescription>
              Sign in to view your profile and manage your events.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" render={<Link href="/signin" />}>
              Sign in
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const initials =
    user.name
      .split(" ")
      .map((part) =>part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground">
          Your account details and quick links.
        </p>
      </div>

      <Card className="gap-0 overflow-hidden rounded-2xl py-0">
        <div className="h-28 bg-linear-to-r from-primary/15 via-primary/10 to-transparent sm:h-32" />
        <div className="flex flex-col gap-5 px-5 pb-6 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <Avatar className="-mt-10 size-20 ring-4 ring-card sm:-mt-12 sm:size-24">
              <AvatarImage src={user.image ?? ""} alt={user.name} />
              <AvatarFallback className="bg-primary text-2xl font-semibold text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1 pb-1">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {user.name}
              </h2>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Mail className="size-3.5" />
                {user.email}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 pb-1">
            {user.emailVerified ? (
              <Badge variant="secondary">
                <ShieldCheck className="size-3" />
                Verified
              </Badge>
            ) : (
              <Badge variant="outline">Unverified</Badge>
            )}
            <Badge variant="outline">Member since {memberSince}</Badge>
          </div>
        </div>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="rounded-2xl lg:col-span-2">
          <CardHeader>
            <CardTitle>Account details</CardTitle>
            <CardDescription>
              Information associated with your Socially account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="divide-y divide-border">
              <AccountRow label="Full name" value={user.name} />
              <AccountRow label="Email address" value={user.email} />
              <AccountRow
                label="Email status"
                value={user.emailVerified ? "Verified" : "Not verified"}
              />
              <AccountRow label="Member since" value={memberSince} />
            </dl>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
            <CardDescription>Jump back into your events.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {actions.map(({ href, title, description, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-3 rounded-xl border border-border/70 p-3 transition-colors hover:border-border hover:bg-muted/60"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-background group-hover:text-foreground">
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">{title}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {description}
                  </span>
                </span>
                <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </CardContent>
          <CardFooter>
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleSignOut}
            >
              <LogOut className="size-4" />
              Sign out
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;