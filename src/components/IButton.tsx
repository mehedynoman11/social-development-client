'use client'
import { authClient } from '@/lib/auth-client';
import React, { useContext } from 'react';
import { Button } from './ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import EditDialogPage from './EditDialog';
import DeleteDialogPage from './DeleteDialog';
import { IUpcomingEvent } from '@/app/upcoming-event/page';
import { EventContext } from '@/context/eventContext';
import toast from 'react-hot-toast';

const IButton = ({ event }: { event: IUpcomingEvent }) => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const { _id } = event;

    const { addEvent, setAddEvent } = useContext(EventContext);
    const handleAddEvent = () => {
        const alreadyJoined = addEvent.some((e) => e._id === event._id);
        if (alreadyJoined) {
            toast.error('You have already joined this event');
            return;
        }
        setAddEvent([...addEvent, event]);
        toast.success('Added to Joined Events');
        console.log(addEvent)
    }
    return (
        <div>
            {user ?
                <>
                    <div className="flex gap-3">
                        <EditDialogPage event={event} />
                        <DeleteDialogPage _id={_id} />
                    </div>
                    <div className="space-y-3">
                        <Button onClick={() => handleAddEvent()} className="w-full" size="lg">
                            Join Event
                        </Button>
                    </div>
                </>
                :
                "Sign in to join event."
            }


        </div>
    );
};

export default IButton;