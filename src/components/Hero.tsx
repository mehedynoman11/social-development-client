'use client';

import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { Sparkles, ZodiacGeminiIcon } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative h-screen w-full bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/hero.png')] bg-cover bg-center bg-no-repeat">
            <div className="container mx-auto max-w-6xl h-full px-4">
                <div className="grid md:grid-cols-2 grid-cols-1 h-full items-center gap-10">
                    {/* Left content */}
                    <div className="flex flex-col gap-6 text-center md:text-left">
                        {/* Badge */}
                        <div className="flex justify-center md:justify-start">
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-white/90">
                               <Sparkles />
                                Connecting communities worldwide
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-xl md:text-4xl font-bold text-white leading-tight tracking-tight">
                            Empowering People,
                            <span className="text-primary">Connecting</span> Communities,{' '}
                            <span className="text-primary">Changing</span> Lives
                        </h1>

                        {/* Description */}
                        <p className="text-base md:text-lg text-white/80 max-w-lg mx-auto md:mx-0 leading-relaxed">
                            Discover meaningful events, build lasting connections, and make a real
                            impact in your community. Join thousands of people already creating
                            change together.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
                            <Button
                                size="lg"
                                className="rounded-full px-8 text-base font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
                            >
                                <Link href="/upcoming-event">Explore Upcoming Events</Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="rounded-full px-8 text-base font-semibold bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-foreground transition-all"
                            >
                                <Link href="/create-event">Create Event</Link>
                            </Button>
                        </div>

                        {/* Social proof */}
                        <div className="flex items-center justify-center md:justify-start gap-4 pt-6">
                           
                            <p className="text-sm text-white/70">
                                <span className="font-semibold text-white">2,000+</span> members joined
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Hero;