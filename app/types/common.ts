export type TicketMeta = {
    counterTitle: string;
    ageRange: string;
    counterDescription: string;
    counterPriceValue: string;
    type: string;
    biggerText: string;
    questionMark: string;
    selectedTicketIdx: string;
    rangeLowest: string;
    isFriendPack: string;
    familyPack: string;
    isFamilyPack: string;
    adultPack: string;
    extCard: string;
    sectionIndex: string;
    gaPrices: string;
    isGroup: string;
};

export type TicketProps = {
    currency_amount: string;
    currency_amount_max: null | number;
    currency_amount_min: null | number;
    currency_code: string;
    description: string;
    gl_code: string;
    id: string;
    name: string;
    portal_id: string;
    price_library_config: null;
    price_library_row_id: null;
    price_strategy: string;
    qty: number;
    scan_code_type: null;
    summary: string;
    ticket_group_id: string;
}

export type tempCartProps = {
    event_session_id?: string,
    ticket_type_id?: string
}
