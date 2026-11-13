'use client'
import { authClient } from '@/lib/auth-client';
import React from 'react';
import { Button } from './ui/button';
import { Pencil, Trash2 } from 'lucide-react';

const IButton = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    return (
        <div>
            {user ?
                <>
                    <div className="flex gap-3">
                        <Button variant="outline" className="flex-1">
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit
                        </Button>
                        <Button variant="destructive" className="flex-1">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                        </Button>
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