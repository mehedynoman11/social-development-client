import Image from "next/image";
import Link from "next/link";

const Footer = () => (
  <footer className="mt-auto border-t border-amber-200/50 dark:border-slate-700 bg-white dark:bg-slate-900">
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="inline-flex items-center gap-2">
            <Image
              src="/people.png"
              alt=""
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-lg font-bold tracking-tight">Socially</span>
          </Link>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Bringing people together to make a positive difference in our
            communities.
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap gap-x-6 gap-y-2 text-sm"
        >
          <Link
            href="/upcoming-event"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            Upcoming Events
          </Link>
          <Link
            href="/signin"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            Create Account
          </Link>
        </nav>
      </div>

      <div className="mt-6 border-t border-slate-400 dark:border-slate-700 pt-4 text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Socially. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
