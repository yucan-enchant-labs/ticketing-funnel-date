import { TicketProps } from "./common"
export type OrderDetailProps = {
    info: {
        location: string,
        timezone: string,
        date: string,
        arrival: string,
    },
    details: {
        tickets: Array<any>,
        fees: {
            tax: string | number,
            facility_fee: string | number,
            subtotal: string | number,
            total: string | number,

        }
    }
}

export type ReviewTicketProps = {
    tickets: TicketProps[];
    sellerId: string | undefined;
    city: string | undefined,
    session: { [type: string]: string };
    canCheckout: boolean,
}

export type paymentElementProps = {
    browserType: string,
    stripeAccount: string,
    $stripe: string,
    amount: number,
    onError: (error: string) => void;
}

export type PaymentProps = {
    type: string;
    card: any | null;
    stripe: any | null;
}


export type PaymentDetailInfoProps = {
    country: string,
    zipCode: string,
}
export type PaymentAdditionalInfoProps = {
    country?: string,
    send_marketing_email?: boolean,
    address?: string,
    address_more?: string,
    state?: string,
    city?: string,
    zip_code?: string,
    phone_number?: string,
    phone?: string,
    // hallmark_opt_in: this.getCheckboxesStatus.hallmark,
    referral_code?: string, // make sure only passed if 2 or more GA tickets on order
    sms_marketing_opt_in?: string,
    newsletter?: boolean,
}

export type userInfoProps = {
    first_name: string,
    last_name: string,
    email: string,
    phone?: string,
    additional_info?: PaymentAdditionalInfoProps,
}

export type CheckoutPostBodyProps = {
    amount: string;
    gateway_id: string;
    gateway_data: any;
    guest_identity_id: string | null;
};

export type AmountProps = { number: number; string: string } | null;
