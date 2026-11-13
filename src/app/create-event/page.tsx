'use client'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { authClient } from "@/lib/auth-client";
import { string } from "better-auth"
import React from "react"
import toast from "react-hot-toast"

const CreateEventPage = () => {

    const handleCreateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formValue = new FormData(e.currentTarget);
        const raw = Object.fromEntries(formValue.entries());

        const data = {
            title: String(raw.title ?? '').trim(),
            description: String(raw.description ?? '').trim(),
            eventType: String(raw.eventType ?? ''),
            image: String(raw.image ?? '').trim(),
            location: String(raw.location ?? '').trim(),
            eventDate: raw.eventDate ? new Date(String(raw.eventDate)).toISOString() : null,
        };

        if (!data.title || !data.eventType || !data.eventDate) {
            console.error('Missing required fields');
            return;
        }


        const res = await fetch("http://localhost:5000/create-event", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        try {
            const eventData = await res.json();

            if (!res.ok) {
                toast.error(eventData.message || "Failed to create event.");
                return;
            }

            toast.success("Event Created Successfully.");

        } catch (error) {
            toast.error("Something went wrong!");
            console.error(error);
        }
    }
    return (
        <div>
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
                <div className="flex w-full max-w-sm flex-col gap-6">
                    <div className="flex flex-col gap-6">
                        <Card>
                            <CardHeader className="text-center">
                                <CardTitle className="text-xl">Create an event</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleCreateEvent}>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel htmlFor="title">Event Title</FieldLabel>
                                            <Input
                                                id="title"
                                                type="text"
                                                name="title"
                                                placeholder="Community Cleanup Drive"
                                                required
                                            />
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="description">Description</FieldLabel>
                                            <Textarea
                                                id="description"
                                                name="description"
                                                placeholder="Describe what this event is about, who it's for, and what to bring..."
                                                rows={5}
                                                required
                                            />
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="eventType">Event Type</FieldLabel>
                                            <Select name="eventType" id="eventType" required>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select an event type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="cleanup">Cleanup</SelectItem>
                                                    <SelectItem value="plantation">Plantation</SelectItem>
                                                    <SelectItem value="donation">Donation</SelectItem>
                                                    <SelectItem value="workshop">Workshop</SelectItem>
                                                    <SelectItem value="fundraiser">Fundraiser</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="thumbnail">Thumbnail Image URL</FieldLabel>
                                            <Input
                                                id="image"
                                                name="image"
                                                type="url"
                                                placeholder="https://example.com/event-cover.jpg"
                                                required
                                            />
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="location">Location</FieldLabel>
                                            <Input
                                                id="location"
                                                name="location"
                                                type="text"
                                                placeholder="Central Park, New York, NY"
                                                required
                                            />
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="eventDate">Event Date</FieldLabel>
                                            <Input
                                                id="eventDate"
                                                name="eventDate"
                                                type="datetime-local"
                                                required
                                            />
                                        </Field>
                                    </FieldGroup>

                                    <Button type="submit" className="w-full mt-6 rounded-full">
                                        Create Event
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default CreateEventPage;