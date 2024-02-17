import { atom } from "jotai";
import { PaymentProps, userInfoProps } from "../types/order";

export const cartAtom = atom<any | null>(null);

export const selectedTicket = atom<any | null>(null);

export const paymentMethod = atom<PaymentProps>({
    type: 'card',
    card: null,
    stripe: null
});

export const userInfoAtom = atom<userInfoProps>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    additional_info: {
        country: '',
        send_marketing_email: false,
        address: '',
        address_more: '',
        state: '',
        city: '',
        zip_code: '',
        phone_number: '',
        phone: '',
        // hallmark_opt_in: this.getCheckboxesStatus.hallmark,
        referral_code: '', // make sure only passed if 2 or more GA tickets on order
        sms_marketing_opt_in: '',
        newsletter: false,
    }
});

export const triggerPayment = atom<boolean>(false);

export const checkoutResultAtom = atom<any | null>(null)