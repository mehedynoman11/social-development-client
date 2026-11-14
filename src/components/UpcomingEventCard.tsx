import { IUpcomingEvent } from '@/app/upcoming-event/page';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const UpcomingEventCard = ({ event }: { event: IUpcomingEvent }) => {
    const formattedDate = new Date(event.eventDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
    return (
        <div className="group bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">

            <div className="relative h-52 w-full overflow-hidden">
                <Image
                    src={event.image}
                    alt={event.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                <span className="absolute top-4 left-4 bg-indigo-600 dark:bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">
                    {event.eventType}
                </span>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-2 line-clamp-2">
                    {event.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-slate-400 mb-4 line-clamp-2 flex-grow">
                    {event.description}
                </p>


                <div className="space-y-2 text-sm text-gray-700 dark:text-slate-300 mb-4">
                    <div className="flex items-center gap-2">
                        <svg
                            className="w-4 h-4 text-indigo-600 dark:text-indigo-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg
                            className="w-4 h-4 text-indigo-600 dark:text-indigo-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <span>{formattedDate}</span>
                    </div>
                </div>

                <Link
                    href={`/upcoming-event/${event._id}`}
                    className="mt-auto w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200"
                >
                    View Event
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default UpcomingEventCard;