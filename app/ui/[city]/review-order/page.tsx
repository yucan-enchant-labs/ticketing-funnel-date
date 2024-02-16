'use client'
import { OrderReviewCard } from '@/app/components/order-review-card';
import { useEffect, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { metaAtom, sessionAtom, errorAtom } from '@/app/states/common';
import { selectedTicket, userInfoAtom } from '@/app/states/order';
import { OrderDetailProps } from '@/app/types/order';
import { InfoForm } from './infoForm';
import { ErrorProps } from "@/app/types/state";
import { PaymentDetails } from './paymentDetails';
import { triggerPayment } from '@/app/states/order';
import { paymentMethod } from '@/app/states/order';
import { PaymentProps } from '@/app/types/order';
import { PaymentDetailInfoProps, userInfoProps, PaymentAdditionalInfoProps } from '@/app/types/order';
import { getUserInfo } from '@/app/apis/order';


const RevewOrderPage: React.FC = () => {
    const [details, setDetails] = useState<OrderDetailProps | undefined>();
    const [amount, setAmount] = useState<number>(0);
    const [identityId, setIdentityId] = useState<string>('');
    const [cardDetails, setCardDetails] = useState<object>({});
    const isTriggerPayment = useAtomValue(triggerPayment);
    // const [errorInfo, setErrorInfo] = useState<Array<ErrorProps>>([]);

    const meta = useAtomValue(metaAtom);
    const tickets = useAtomValue(selectedTicket);
    const available = useAtomValue(sessionAtom);
    const setErrors = useSetAtom(errorAtom);
    const infoDetails = useAtomValue(userInfoAtom);
    const payments = useAtomValue(paymentMethod);
    const [currentErrors, setCurrentErrors] = useState<Array<ErrorProps>>([]);
    const errors = useAtomValue(errorAtom);


    const handleErrors = () => {
        const errorStatus = currentErrors.some((err) => err.status === true);
        console.log(currentErrors.length, errorStatus)
        return errorStatus;
    };

    const ensureUser = async (paymentDetailInfo: PaymentDetailInfoProps, infoDetails: userInfoProps) => {
        const userBody: userInfoProps = {
            first_name: infoDetails.first_name,
            last_name: infoDetails.last_name,
            email: infoDetails.email,
            additional_info: {
                country: paymentDetailInfo.country,
                send_marketing_email: false,
                address: '',
                address_more: '',
                state: '',
                city: '',
                zip_code: paymentDetailInfo.zipCode,
                phone_number: infoDetails.phone,
                phone: infoDetails.phone,
                referral_code: '',
                sms_marketing_opt_in: '',
                newsletter: false,
            } as PaymentAdditionalInfoProps,
        };
        try {

            await getUserInfo(userBody);
            // Add error in the pop-up if there's a 409 error
            // this.$store.dispatch("setUserInfo", user);
            // console.log('fetchUser:', user);
            // return user;
        } catch (err: any) {
            if (err.response.data._data[0]._code === "conflict") {
                //   this.$store.dispatch("setEmailError", "");
                //   this.errorMsg = "";
                setIdentityId(err.response.data._data[0]._extra.identity_id);
            } else {
                if (err?.response?.data?.details?._data[0]?._description) {
                    handleError('userEmail', err?.response?.data?.details?._data[0]?._description)
                }
            }
            throw "Could not create user";
            // }
        }
        // Continue with other steps
        // completeCheckout();

    };
    const completeCheckout = async (
        paymentDetailInfo: PaymentDetailInfoProps,
        infoDetails: userInfoProps,
        identityId: string
    ) => {
        const anyErrors = handleErrors();
        if (anyErrors) {
            return;
        }
        // await purchase();
        await ensureUser(paymentDetailInfo, infoDetails);
        console.log("Collecting info...");
    };
    const handleError = async (errorType: string, errorMsg: string) => {
        setErrors((prevErrors) => {
            const existingErrorIndex = prevErrors.findIndex((error) => error.type === errorType);

            if (existingErrorIndex !== -1) {
                const updatedErrors = [...prevErrors];
                updatedErrors[existingErrorIndex] = { type: errorType, status: true, msg: errorMsg };
                return updatedErrors;
            } else {
                return [...prevErrors, { type: errorType, status: true, msg: errorMsg }];
            }
        });
    }

    const purchase = async (payment: PaymentProps) => {
        if (payment.type !== 'card') {
            console.log('other payment method...');
        } else {
            console.log('pay by card...');

            try {
                const card = payment.card;
                const stripe = payment.stripe;
                const res = await stripe.createPaymentMethod({ type: "card", card });
                if (res.paymentMethod) {
                    console.log('rereres', res.paymentMethod);
                    setCardDetails(res.paymentMethod);
                    return res.paymentMethod;
                } else if (res.error.type === "validation_error") {
                    return null;
                } else {
                    throw new Error(res.error);
                }
            } catch (error) {
                console.error("An error occurred:", error);
                return null;
            }
        }
    }

    useEffect(() => {
        setCurrentErrors(errors);
        if (isTriggerPayment && payments.card && !('card' in cardDetails)) {
            console.log('readyyy')
            purchase(payments);
            // const theCardDetails = purchase(payments);
            // if(theCardDetails.billing){
            //     setCardDetails(theCardDetails)
            // }
            // completeCheckout();
        }
        if ('card' in cardDetails && infoDetails.email.length > 0) {
            console.log('carddd', cardDetails)
            const cardInfo = cardDetails as { card: { country: string; address_zip: string } };

            const paymentDetailInfo: PaymentDetailInfoProps = {
                country: cardInfo.card.country,
                zipCode: cardInfo.card.address_zip,
            };
            completeCheckout(paymentDetailInfo, infoDetails, identityId);
        }
        if (tickets && !details) {
            const location = `${meta.city?.city} - ${meta.city?.venueName}`;
            const timezone = `${meta.city?.timezone}`;
            const eventDate = available.selectedDate;
            const eventArrival = `${available.sessionStart} - ${available.sessionEnd}`;
            const fees = tickets?.cart_fees[0].grand_totals;

            const totalAmount = parseFloat(Number(fees.total_after_fees_price).toFixed(2)) * 100;
            setAmount(totalAmount)

            const detailInfo: OrderDetailProps = {
                info: {
                    location,
                    timezone,
                    date: eventDate,
                    arrival: eventArrival,
                },
                details: {
                    tickets: tickets.tickets,
                    fees: {
                        tax: fees.total_fee_percent_outside,
                        facility_fee: fees.total_fee_fixed_outside,
                        subtotal: fees.total_before_fees_price,
                        total: fees.total_outstanding,
                    }
                }
            }
            setDetails(detailInfo);
        }
    }, [
        tickets,
        details,
        meta,
        available,
        errors,
        isTriggerPayment,
        payments,
        cardDetails,
        infoDetails,
        identityId
    ]);

    return (
        <>
            {details && meta.city?.id && (
                <div>
                    <OrderReviewCard {...details} />
                    <PaymentDetails sellerId={meta.city?.id} amount={amount} onError={handleError} />
                    <InfoForm onError={handleError} />
                </div>
            )}
        </>
    );
}


export default RevewOrderPage;