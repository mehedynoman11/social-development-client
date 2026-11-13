'use client'
import { IUpcomingEvent } from "@/app/upcoming-event/page";
import { createContext, Dispatch, SetStateAction, useState } from "react"

interface IEventContext {
    addEvent: IUpcomingEvent[]
    setAddEvent: Dispatch<SetStateAction<IUpcomingEvent[]>>
}

export const EventContext = createContext<IEventContext>({
    addEvent: [],
    setAddEvent: () => {},
});

const EventProvider = ({children}:{children: React.ReactNode}) => {
    const [addEvent, setAddEvent] = useState<IUpcomingEvent[]>([]);

    const sharedData = {
        addEvent,
        setAddEvent,
    }
    return (
        <EventContext value={sharedData}>
            {children}
        </EventContext>
    )
}

export default EventProvider;