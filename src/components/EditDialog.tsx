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
import { authClient } from "@/lib/auth-client"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { getTokenFromClient } from "@/lib/getTokenFromClient"


const EditDialogPage = ({ event }: { event: IUpcomingEvent }) => {
    const router = useRouter()
    const { data: session } = authClient.useSession();

    if (session?.user?.email !== event.email) return null;

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
        const token = await getTokenFromClient();
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/upcoming-event/${event._id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedEvent),
        })

        try {
            if (!res.ok) throw new Error('Update failed');
            const data = await res.json();
            // console.log("After Submit ",data);
            toast.success('Event updated successfully');
            router.refresh();

        } catch (error) {
            console.error(error);
            toast.error('Failed to update event');
        }
    }
    return (
        <div className="">
           <Dialog>
            <DialogTrigger render={<Button variant="default" className="flex-1 my-2">
                <Pencil className="w-4 h-4 mr-2" />
                Edit
            </Button>} />
            <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl">

                <DialogHeader>
                    <DialogTitle>Edit event</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleUpdateEvent}>
                    <FieldGroup className="md:grid md:grid-cols-2">
                        <Field className="md:col-span-2">
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

                        <Field className="md:col-span-2">
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
                                <SelectTrigger className="w-full">
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
                        <DialogClose render={<Button variant="outline" className="w-full sm:w-auto">Cancel</Button>} />
                        <DialogClose render={<Button type="submit" className="w-full sm:w-auto">Update event</Button>} />
                        {/* <DialogClose render={} /> */}         
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog> 
        </div>
        
    );
};

export default EditDialogPage;