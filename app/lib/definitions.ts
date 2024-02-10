export type City = {
    city: string,
    venueName: string
    id: string,
    timezone: string,
    key: string,
    theme: string,
    code: string,
    stripeAccount: string,
}

export interface CitiesProps {
    cities: City[];
    // onCityClick: (city: string) => void;
}

interface fullAvailabilityWithPriceProps {
    event_session: Array<object>,
    price_schedule: object,
    limit: Array<object>,
}

export interface EventDataProps {
    eventResp?: any;
    sellerMeta?: any;
    eventTemplates?: any;
    eventMeta?: any;
    suiteEventMeta?: any;
}


export interface CalendarProps {
    calendar: Record<string, any>;
}

export interface SessionsProps {
    sessions: Array<any>;
}

// export interface SessionProps {
//     fullAvailability: Array<object>,
//     fullAvailabilityWithPrice: fullAvailabilityWithPriceProps,
// }