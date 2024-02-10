import { axiosTicketure } from "../page";
import { EventDataProps, CalendarProps, SessionsProps } from "../lib/definitions";


export const eventTemplate = async (sellerId: string | undefined): Promise<EventDataProps> => {
    try {
        const eventResp = await axiosTicketure.get(
            `cached_api/events/available?_seller=${sellerId}&hidden_type=public_browsable&ticket_group.hidden_type._in=public_browsable&_embed=ticket_group,ticket_type,first_session,meta,seller,venue,seller.meta`
        );
        const sellerMeta = eventResp.data.meta?._data;
        // const eventTemplates = eventResp.data;
        const eventTemplates = eventResp.data;
        const eventTemplatesData = eventTemplates.event_template._data;
        const gaEventId = eventTemplatesData.find((event: any) => event.name.includes("Admission"))?.id;
        const suiteEventId = eventTemplatesData.find((event: any) => event.name.includes("Suite"))?.id;
        const gaResp = gaEventId ? await axiosTicketure.get(`cached_api/events/${gaEventId}?_embed=ticket_group,ticket_group.meta`) : null;
        const eventMeta = gaResp?.data.meta?._data;
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


export const getCalendar = async (eventId: string, groupId: string, sellerId: string): Promise<CalendarProps> => {
    try {
        const resp = await axiosTicketure.get(
            `/cached_api/events/${eventId}/calendar?_seller=${sellerId}&ticket_group_id._in=${groupId}`
        );
        const calendar: CalendarProps = {
            calendar: resp.data.calendar,
        };
        return calendar;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const getSessions = async (eventId: string, groupId: string, date: string, sellerId: string): Promise<SessionsProps> => {
    try {
        const resp = await axiosTicketure.get(
            `/cached_api/events/${eventId}/sessions?_ondate=${date}&_seller=${sellerId}&ticket_group.id._in=${groupId}`
        );
        const sessionsData = resp.data;
        const sessions: SessionsProps = { sessions: sessionsData };

        return sessions;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


// https://enchant.web.d1tix.com/cached_api/events/0188db13-48af-cfba-d892-2bc649e8fe3d/calendar?_seller=0188db13-48af-ca00-bea4-2af061d2e396&ticket_group_id._in=0188db13-6794-5ea9-5cb2-2054a843ba70,0188db13-6794-eada-1f66-c715c43ba6e0

// export const getFullAvailability = async (eventId: string, body: any): Promise<SessionProps> => {
//     try{
//         const requestSessions = async () => {
//             try {
                
//               const response = await axiosTicketure.get(`/cached_api/events/available`);
//             //   const response = await axiosTicketure.get(`/cached_api/events/${eventId}/sessions?_limit=1000`);
//             //   const resp = await axiosTicketure.post(`/api/events/${eventId}/sessions?_limit=1000`, body);
        
//             //   return { resp, response };
//             return response;
//             } catch (error) {
//               console.log("ERROR", error);
//               throw error;
//             }
//           };
//           const availableSessions = await requestSessions();
//           const fullAvailability = availableSessions.response.data.event_session._data;
//           const fullAvailabilityWithPrice = availableSessions.resp.data;

//           return {
//             fullAvailability,
//             fullAvailabilityWithPrice,
//         } as SessionProps;
//         }catch(err){

//         }
    
// };