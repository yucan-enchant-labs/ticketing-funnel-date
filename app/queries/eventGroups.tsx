// // import {getQuery, postQuery} from './hooks';
// import {EventsQueryList} from '../constants/api';
// // import {orderIdT, sellerIdT, onDateT, eventTemplateIdT} from './types/groups';
// // import {AvailableEventSessionsAndPriceReqBody} from './types/changeDate';
// import {TIX_URL} from '../constants/env';

// export const getEventsAvailable = async (sellerId: sellerIdT) =>
//   await getQuery(EventsQueryList.getEventAvailable(sellerId)); //

// export const getSellerData = async (sellerId: sellerIdT) =>
//   await getQuery(EventsQueryList.getSellerData(sellerId), TIX_URL);

// export const getEventSessions = async (eventTemplateId: eventTemplateIdT) =>
//   await getQuery(EventsQueryList.getEventSessions(eventTemplateId));

// export const getEventSessionsForOneDate = async (eventTemplateId: eventTemplateIdT, onDate: onDateT) =>
//   await getQuery(EventsQueryList.getEventSessionsForOneDate(eventTemplateId, onDate)); //

// export const setPostEventSessions = async (orderId: orderIdT) =>
//   await postQuery(EventsQueryList.postEventSessions(orderId));

// export const getAvailableEventSessionsAndPrice = async ({
//   eventTemplateId,
//   body,
// }: AvailableEventSessionsAndPriceReqBody) =>
//   await postQuery(EventsQueryList.getEventSessionAndPrice(eventTemplateId)).send(body);
import { axiosTicketure } from "../page";
import { EventDataProps } from "../lib/definitions";


export const eventTemplate = async (sellerId: string | undefined): Promise<EventDataProps> => {
    try {
        const eventResp = await axiosTicketure.get(
            `cached_api/events/available?_seller=${sellerId}&hidden_type=public_browsable&ticket_group.hidden_type._in=public_browsable&_embed=ticket_group,ticket_type,first_session,meta,seller,venue,seller.meta`
        );
        console.log(111)
        const sellerMeta = eventResp.data.meta?._data;
        // const eventTemplates = eventResp.data;
        const eventTemplates = eventResp.data.event_template._data;

        console.log(eventTemplates, 'tmppp')
        const gaEventId = eventTemplates.find((event: any) => event.name.includes("Admission"))?.id;
        const suiteEventId = eventTemplates.find((event: any) => event.name.includes("Suite"))?.id;
        console.log(222)
        const gaResp = gaEventId ? await axiosTicketure.get(`cached_api/events/${gaEventId}?_embed=ticket_group,ticket_group.meta`) : null;
        const eventMeta = gaResp?.data.meta?._data;
        console.log(333, gaResp)
        const suiteResp = suiteEventId ? await axiosTicketure.get(`cached_api/events/${suiteEventId}?_embed=ticket_group,ticket_group.meta`) : null;
        const suiteEventMeta = suiteResp?.data.meta?._data;

        return {
            eventResp,
            sellerMeta,
            eventTemplates,
            eventMeta,
            suiteEventMeta,
        } as EventDataProps;
    } catch (err) {
        console.error("Could not fetch events.");
        console.error(JSON.stringify(err));
        return {
            eventResp: undefined,
            sellerMeta: undefined,
            eventTemplates: undefined,
            eventMeta: undefined,
            suiteEventMeta: undefined,
        } as EventDataProps;
    }
};

