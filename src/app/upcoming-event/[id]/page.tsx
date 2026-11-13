import React from 'react';
import { IUpcomingEvent } from '../page';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Bookmark, CalendarDays, MapPin, Pencil, Share2, Tag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import IButton from '@/components/IButton';

const EventDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const res = await fetch(`http://localhost:5000/upcoming-event/${id}`);

    if (!res.ok) {
        notFound();
    }

    const event: IUpcomingEvent = await res.json();

    if (!event?._id) {
        notFound();
    }

    const eventDate = new Date(event.eventDate);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const formattedTime = eventDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });

    
    return (
        <section className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <Link
                    href="/upcoming-event"
                    className="mb-6 -ml-2 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Events
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Image + Description */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Hero Image */}
                        <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src={event.image}
                                alt={event.title}
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 66vw"
                                className="object-cover"
                            />
                            <Badge className="absolute top-4 left-4 capitalize text-sm px-3 py-1">
                                {event.eventType}
                            </Badge>
                        </div>

                        {/* Title + Description */}
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                                {event.title}
                            </h1>

                            <div className="flex flex-wrap gap-3 mt-4 text-sm text-gray-600">
                                <span className="inline-flex items-center gap-1.5">
                                    <CalendarDays className="w-4 h-4 text-indigo-600" />
                                    {formattedDate}
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4 text-indigo-600" />
                                    {event.location}
                                </span>
                            </div>

                            <Separator className="my-6" />

                            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                About this Event
                            </h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {event.description}
                            </p>
                        </div>
                    </div>

                    {/* Right: Sticky Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="lg:sticky lg:top-6 shadow-md">
                            <CardContent className="p-6 space-y-5">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Event Details
                                    </h3>

                                    <div className="space-y-4 text-sm">
                                        <div className="flex items-start gap-3">
                                            <CalendarDays className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    Date & Time
                                                </p>
                                                <p className="text-gray-600">
                                                    {formattedDate}
                                                </p>
                                                <p className="text-gray-600">
                                                    {formattedTime}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <MapPin className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    Location
                                                </p>
                                                <p className="text-gray-600">
                                                    {event.location}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <Tag className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    Event Type
                                                </p>
                                                <Badge
                                                    variant="secondary"
                                                    className="mt-1 capitalize"
                                                >
                                                    {event.eventType}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Separator />
                                <IButton />

                               
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventDetailsPage;