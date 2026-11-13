'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { IUpcomingEvent } from "@/app/upcoming-event/page"
import toast from "react-hot-toast"


const EditDialogPage = ({ event }: { event: IUpcomingEvent }) => {
    const handleUpdateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const { _id, ...updateeEvent } = event;
        const formData = new FormData(e.currentTarget);
        const updatedEvent = {
            title: formData.get('title'),
            description: formData.get('description'),
            eventType: formData.get('eventType'),
            image: formData.get('image'),
            location: formData.get('location'),
            eventDate: formData.get('eventDate'),
        };
        const res = await fetch(`http://localhost:5000/upcoming-event/${event._id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedEvent),
        })

        try {
            if (!res.ok) throw new Error('Update failed');
            const data = await res.json();
            console.log("After Submit ",data);
            toast.success('Event updated successfully');

        } catch (error) {
            console.error(error);
            toast.error('Failed to update event');
        }
    }
    return (
        <Dialog>
            <DialogTrigger render={<Button variant="outline" className="flex-1 my-2">
                <Pencil className="w-4 h-4 mr-2" />
                Edit
            </Button>} />
            <DialogContent className="sm:max-w-sm">

                <DialogHeader>
                    <DialogTitle>Edit event</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleUpdateEvent}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="title">Event Title</FieldLabel>
                            <Input
                                id="title"
                                type="text"
                                name="title"
                                placeholder="Community Cleanup Drive"
                                defaultValue={event.title}
                                required
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="description">Description</FieldLabel>
                            <Textarea
                                id="description"
                                name="description"
                                defaultValue={event.description}
                                placeholder="Describe what this event is about, who it's for, and what to bring..."
                                rows={5}
                                required
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="eventType">Event Type</FieldLabel>
                            <Select name="eventType" defaultValue={event.eventType} id="eventType" required>
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
                                defaultValue={event.image}
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
                                defaultValue={event.location}
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
                                defaultValue={
                                    event.eventDate
                                        ? new Date(event.eventDate).toISOString().slice(0, 16)
                                        : ''
                                }
                                type="datetime-local"
                                required
                            />
                        </Field>
                    </FieldGroup>

                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Cancel</Button>} />
                        {/* <DialogClose render={} /> */}
                        <Button type="submit">Update event</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditDialogPage;