'use client'
import { OrderReviewCard } from '@/app/components/order-review-card';
import { useEffect, useState, useCallback } from 'react';
import { useAtomValue, useSetAtom, useAtom } from 'jotai';
import { metaAtom, sessionAtom, errorAtom } from '@/app/states/common';
import { selectedTicket, userInfoAtom, cartAtom, checkoutResultAtom } from '@/app/states/order';
import { OrderDetailProps } from '@/app/types/order';
import { InfoForm } from '../../../components/infoForm';
import { ErrorProps } from "@/app/types/state";
import { PaymentDetails } from './paymentDetails';
import { triggerPayment, paymentMethod } from '@/app/states/order';
import { PaymentProps, CheckoutPostBodyProps, AmountProps } from '@/app/types/order';
import { PaymentDetailInfoProps, userInfoProps, PaymentAdditionalInfoProps } from '@/app/types/order';
import { getUserInfo, checkOut } from '@/app/apis/order';
import { useRouter } from 'next/navigation'
const RevewOrderPage: React.FC = () => {
    const [details, setDetails] = useState<OrderDetailProps | undefined>();
    const [checkoutPostBody, setCheckoutPostBody] = useState<CheckoutPostBodyProps | null>(null);
    const [currentErrors, setCurrentErrors] = useState<Array<ErrorProps>>([]);
    const [amount, setAmount] = useState<AmountProps>(null);
    const [identityId, setIdentityId] = useState<string | null>(null);
    const [cardDetails, setCardDetails] = useState<object>({});
    const [hasRedirected, setHasRedirected] = useState<boolean>(false);

    const [isTriggerPayment, setIsTriggerPayment] = useAtom(triggerPayment);
    const meta = useAtomValue(metaAtom);
    const tickets = useAtomValue(selectedTicket);
    const available = useAtomValue(sessionAtom);
    const cartInfo = useAtomValue(cartAtom);
    const infoDetails = useAtomValue(userInfoAtom);
    const payments = useAtomValue(paymentMethod);
    const [errors, setErrors] = useAtom(errorAtom);
    const [checkoutResp, setCheckoutResp] = useAtom(checkoutResultAtom);
    const router = useRouter()
    const handleErrors = () => {
        const errorStatus = currentErrors.some((err) => err.status === true);
        console.log(currentErrors.length, errorStatus)
        return errorStatus;
    };

    const ensureUser = useCallback(
        async (paymentDetailInfo: PaymentDetailInfoProps, infoDetails: userInfoProps) => {
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
                const user = await getUserInfo(userBody);
                return user;
            } catch (err: any) {
                if (err.identityId) {
                    setIdentityId(err.identityId);
                } else if (err.description) {
                    handleError('userEmail', err.description);
                }
                return false;
            }
            // try {

            //     await getUserInfo(userBody);
            //     // Add error in the pop-up if there's a 409 error
            //     // this.$store.dispatch("setUserInfo", user);
            //     // console.log('fetchUser:', user);
            //     // return user;
            // } catch (err: any) {
            //     if (err.response.data._data[0]._code === "conflict") {
            //         //   this.$store.dispatch("setEmailError", "");
            //         //   this.errorMsg = "";
            //         setIdentityId(err.response.data._data[0]._extra.identity_id);
            //     } else {
            //         if (err?.response?.data?.details?._data[0]?._description) {
            //             handleError('userEmail', err?.response?.data?.details?._data[0]?._description)
            //         }
            //     }
            //     throw "Could not create user";
            //     // }
            // }
            // Continue with other steps
            // completeCheckout();

        }, [])

    const createCheckoutPostBody = (
        amount: string,
        gatewayId: string,
        gatewayData: any,
        guestIdentityId: string | null,
    ): void => {
        const body: CheckoutPostBodyProps = {
            amount: amount,
            gateway_id: gatewayId,
            gateway_data: gatewayData,
            guest_identity_id: guestIdentityId,
        };

        setCheckoutPostBody(body);
    };


    const completeCheckout = useCallback(
        async (
            paymentDetailInfo: PaymentDetailInfoProps,
            infoDetails: userInfoProps,
            identityId: string | null,
            amount: string,
            cartId: string,
        ) => {
            const anyErrors = handleErrors();
            if (anyErrors) {
                return;
            }
            const user = await ensureUser(paymentDetailInfo, infoDetails);
            if (amount && (user)) {
                const identity_id = user.data.identity._data[0].id;
                // if addon flow
                // addon flow logic ...

                // if general flow
                if (amount == '0') {
                    createCheckoutPostBody(amount, "free", {}, identity_id);
                } else if (cartId) {
                    createCheckoutPostBody(
                        amount,
                        "stripe",
                        {
                            // pay by card
                            source: cartId,
                        },
                        identity_id,
                    );
                }
                // if (checkoutPostBody && cartInfo.id) {
                //     try {
                //         const resp = await checkOut(cartInfo.id, checkoutPostBody);
                //         setCheckoutResp(resp);
                //         console.log(resp, 'finally');
                //         // clear interval
                //         // ...
                //         setTriggerPayment(false);

                //         // SEGMENT IDENTIFY
                //         // ...
                //         // return resp;
                //     } catch (err: any) {
                //         if (err.description) {
                //             setTriggerPayment(false);
                //             handleError('card', err.description);
                //         }
                //         return false;
                //     }
                // }

                // if addon flow
                // addon flow logic ...

                // general flow

            }
            setIsTriggerPayment(false);
        }, []
    )

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

    const purchase = useCallback(async (payment: PaymentProps) => {
        if (payment.type !== 'card') {
            console.log('other payment method...');
        } else {
            console.log('pay by card...');

            try {
                const card = payment.card;
                const stripe = payment.stripe;
                const res = await stripe.createPaymentMethod({ type: "card", card });
                if (res.paymentMethod) {
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
    }, []);


    useEffect(() => {
        const processCheckout = async () => {
            if (tickets && !details) {
                const location = `${meta.city?.city} - ${meta.city?.venueName}`;
                const timezone = `${meta.city?.timezone}`;
                const eventDate = available.selectedDate;
                const eventArrival = `${available.sessionStart} - ${available.sessionEnd}`;
                const fees = tickets?.cart_fees[0].grand_totals;

                const totalAmount = {
                    number: parseFloat(Number(fees.total_after_fees_price).toFixed(2)) * 100,
                    string: fees.total_after_fees_price,
                }

                setAmount(totalAmount);

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
            };
            if (isTriggerPayment) {
                setCurrentErrors(errors);
                if (payments.card && !('card' in cardDetails)) {
                    await purchase(payments);
                    // const theCardDetails = purchase(payments);
                    // if(theCardDetails.billing){
                    //     setCardDetails(theCardDetails)
                    // }
                    // completeCheckout();
                }
                if ('id' in cardDetails && 'card' in cardDetails && infoDetails.email.length > 0) {
                    const cardInfo = cardDetails as { card: { country: string; address_zip: string } };
                    const paymentDetailInfo: PaymentDetailInfoProps = {
                        country: cardInfo.card.country,
                        zipCode: cardInfo.card.address_zip,
                    };
                    const cartId = cardDetails.id as string;
                    if (amount) {

                        await completeCheckout(paymentDetailInfo, infoDetails, identityId, amount.string, cartId);
                    }

                }
            } else if (checkoutPostBody) {
                const body = checkoutPostBody;
                setCheckoutPostBody(null);
                // checkout
                try {
                    const resp = await checkOut(cartInfo.id, body, meta.city?.key);
                    setCheckoutResp(resp.data);
                    // clear interval
                    // ...

                    // SEGMENT IDENTIFY
                    // ...


                    return true;


                    // return true;

                    // checkout result data

                } catch (err: any) {
                    if (err.description) {
                        handleError('card', err.description);
                    }
                    return false;
                }
            }
            // console.log('checkout:',checkoutPostBody,checkoutResp, hasRedirected)
            if (!checkoutPostBody && checkoutResp) {
                // jump to order confirmation page 
                setHasRedirected(true);
                router.push(`/${meta.city?.key}/order-confirmation`);
            }
        };
        processCheckout();

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
        cartInfo,
        identityId,
        checkoutPostBody,
        checkoutResp
        // hasRedirected
    ]);

    return (
        <>
            {details && meta.city?.id && (
                <div>
                    <OrderReviewCard {...details} />
                    {amount && <PaymentDetails sellerId={meta.city?.id} amount={amount?.number} onError={handleError} />}
                    <InfoForm onError={handleError} cityCode={meta.city?.code} cityKey={meta.city?.key} />
                </div>
            )}
        </>
    );
}


export default RevewOrderPage;