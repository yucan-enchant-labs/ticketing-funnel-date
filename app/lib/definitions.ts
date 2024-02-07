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

export interface EventDataProps {
    eventResp?: any;
    sellerMeta?: any;
    eventTemplates?: any;
    eventMeta?: any;
    suiteEventMeta?: any;
}