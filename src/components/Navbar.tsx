'use client';

import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from 'cn';
import { authClient } from '@/lib/auth-client';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ModeToggle } from './ThemeButton';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleSignout = async () => {
        await authClient.signOut();
    }

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900 backdrop-blur-md border-b border-amber-200/50 dark:border-slate-700">
            <div className="container mx-auto max-w-6xl px-4">
                <div className="flex justify-between items-center py-3">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <div className="p-1 rounded-2xl bg-white dark:bg-slate-800">
                            <Image
                                src="/people.png"
                                alt="Socially"
                                width={36}
                                height={36}
                                loading="eager"
                                className="rounded-lg"
                            />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight">Socially</h1>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/upcoming-event"
                            className={cn(
                                "relative text-lg text-foreground transition-colors duration-300",
                                "after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0",
                                "after:bg-primary after:transition-all after:duration-300",
                                "hover:text-primary hover:after:w-full font-bold"
                            )}
                        >
                            Upcoming Events
                        </Link>
                    </div>
                    <div className="flex sm:hidden items-center">
                        <ModeToggle />
                    </div>
                    {/* Desktop Auth Section */}
                    <div className="hidden md:flex items-center gap-3">
                        <ModeToggle />
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    aria-label="Open account menu"
                                    render={
                                        <button
                                            type="button"
                                            className="group flex items-center gap-2 rounded-full p-1 pr-3 hover:bg-gray-300 dark:hover:bg-slate-800 transition-colors"
                                        />
                                    }
                                >
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden ring-2 ring-primary/30">
                                        {user?.image ? (
                                            <Avatar>
                                                <AvatarImage src={user.image || ""} />
                                            </Avatar>
                                        ) : (
                                            <span className="text-sm font-bold text-primary">
                                                {user?.name.charAt(0)}
                                            </span>
                                        )}
                                    </div>
                                    <ChevronDown className="size-4 transition-transform group-data-[popup-open]:rotate-180" />
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuItem
                                        render={<Link href="/profile" />}
                                        className="flex-col items-start gap-0.5 py-2"
                                    >
                                        <span className="text-sm font-semibold">{user?.name}</span>
                                        <span className="max-w-full truncate text-xs text-muted-foreground">
                                            {user?.email}
                                        </span>
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem render={<Link href="/create-event" />}>
                                        Create Event
                                    </DropdownMenuItem>
                                    <DropdownMenuItem render={<Link href="/manage-events" />}>
                                        Manage Events
                                    </DropdownMenuItem>
                                    <DropdownMenuItem render={<Link href="/joined-event" />}>
                                        Joined Events
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem variant="destructive" onClick={handleSignout}>
                                        Sign out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button className="rounded-full px-6">
                                <Link href="/signin">Sign in</Link>
                            </Button>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-amber-100 dark:hover:bg-slate-800 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <span className={`block h-0.5 w-full bg-foreground rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <span className={`block h-0.5 w-full bg-foreground rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                            <span className={`block h-0.5 w-full bg-foreground rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                        </div>
                    </button>
                </div>

                {/* Mobile */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="flex flex-col gap-1 pt-2 border-t border-amber-200/50 dark:border-slate-700">
                        <Link
                            href="/upcoming-event"
                            className="px-4 py-3 rounded-lg text-base font-semibold hover:bg-amber-100 dark:hover:bg-slate-800 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Upcoming Events
                        </Link>

                        {user ? (
                            <>
                                <div className="flex items-center gap-3 px-4 py-3 mt-1 border-t border-amber-200/50 dark:border-slate-700">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden ring-2 ring-primary/30">
                                        {user?.image ? (
                                            <Avatar>
                                                <AvatarImage src={user.image || ""} />
                                            </Avatar>
                                        ) : (
                                            <span className="text-sm font-bold text-primary">
                                                {user?.name.charAt(0)}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <Link href={'/profile'}>
                                            <p className="text-sm font-semibold">{user?.name}</p>
                                            <p className="text-xs text-muted-foreground">{user?.email}</p>
                                        </Link>
                                    </div>
                                </div>
                                <Link href="/create-event" className="px-4 py-3 rounded-lg text-sm hover:bg-amber-100 dark:hover:bg-slate-800 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                    Create Event
                                </Link>
                                <Link href="/manage-events" className="px-4 py-3 rounded-lg text-sm hover:bg-amber-100 dark:hover:bg-slate-800 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                    Manage Events
                                </Link>
                                <Link href="/joined-event" className="px-4 py-3 rounded-lg text-sm hover:bg-amber-100 dark:hover:bg-slate-800 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                    Joined Events
                                </Link>
                                <button onClick={handleSignout} className="text-left px-4 py-3 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors">
                                    Sign out
                                </button>
                            </>
                        ) : (
                            <div className="px-4 pt-2">
                                <Button className="w-full rounded-full">
                                    <Link href="/signin">Sign in</Link>
                                </Button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
