'use client'
import { authClient } from '@/lib/auth-client';
import React from 'react';
import { Button } from './ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import EditDialogPage from './EditDialog';
import DeleteDialogPage from './DeleteDialog';
import { IUpcomingEvent } from '@/app/upcoming-event/page';

const IButton = ({event}:{event:IUpcomingEvent}) => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const {_id} = event;
    return (
        <div>
            {user ?
                <>
                    <div className="flex gap-3">
                        <EditDialogPage event={event}/>
                        <DeleteDialogPage _id={_id}/>
                    </div>
                    <div className="space-y-3">
                        <Button className="w-full" size="lg">
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