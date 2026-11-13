import UpcomingEventCard from '@/components/UpcomingEventCard';
import React from 'react';

export interface IUpcomingEvent {
    _id: string;
    title: string;
    description: string;
    eventType: string;
    image: string;
    location: string;
    eventDate: string;
}

const UpcomingEventPage = async () => {
    const res = await fetch(`http://localhost:5000/upcoming-event`);
    const eventData: IUpcomingEvent[] = await res.json();

    return (
        <section className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                        Upcoming Events
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover and join our upcoming events. Don't miss out on these
                        exciting opportunities!
                    </p>
                    <div className="mt-6 h-1 w-24 bg-indigo-600 rounded-full mx-auto" />
                </div>

                {/* Events Grid */}
                {eventData.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">
                            No upcoming events at the moment. Please check back later!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {eventData.map((event) => (
                            <div key={event._id}>
                                <UpcomingEventCard event={event}/>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default UpcomingEventPage;