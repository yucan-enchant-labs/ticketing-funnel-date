
import { City } from "../lib/definitions"
export type MetaProps = {
    city?: City,
    sellerMeta?: any,
    eventTemplates?: any,
    eventMeta?: any,
    suiteEventMeta?: any,
}

export type TicketMetaData = {
    ticketTypes: Array<any>,
    ticketGroups: Array<any>,
    addonGroups: Array<any>,
    addonEvents: Array<any>,
    addonEventDetails: Array<any>,
    eventTemplates: Array<any>
}