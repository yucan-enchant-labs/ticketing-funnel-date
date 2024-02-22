import { useRef, useEffect, useState } from 'react';
import { PaymentOptContainer, PaymentOptContent, StripeContainer } from '../styles/container';
import Image from 'next/image';
import { Collapse, CollapseProps } from 'antd';
import applePayIcon from "@/app/assets/images/icons/apple-pay.png";
import googlePayIcon from "@/app/assets/images/icons/google-pay.png";
import browserIcon from "@/app/assets/images/icons/browser.png";
import { loadStripe } from "@stripe/stripe-js";
import { paymentElementProps } from '../types/order';
import { paymentMethod } from '../states/order';
import { useSetAtom } from 'jotai';


export const PaymentOpts: React.FC<paymentElementProps> = ({ ...props }) => {
    const stripecardRef = useRef<HTMLDivElement>(null);
    const [selectedPayment, setSelectedPayment] = useState<string | null>('card');
    const setPaymentMethod = useSetAtom(paymentMethod);
    const { browserType, stripeAccount, $stripe, amount, onError } = props;
    
    const text = `After clicking "Pay with ${browserType === "chrome" ? "Google" : "Apple"
        } Pay" you will be redirected to ${browserType === "chrome" ? "Google" : "Apple"
        } Pay complete your purchase securely`;

    const selectPaymentMethod = (method: string) => {
        return () => {
            setPaymentMethod((props) => ({
                ...props,
                type: method,
            }));
            setSelectedPayment(method);
        };
    };

    const options: CollapseProps['items'] = [
        {
            key: 'card',
            label:
                <div className='flex width-full justify-start gap-2'>
                    <input
                        type="radio"
                        name="payment"
                        checked={selectedPayment === 'card'}
                        onChange={selectPaymentMethod('card')}
                        id="card"
                        value="card"
                    />
                    <label htmlFor="card">Credit Card</label>
                </div>,
            children: <div ref={stripecardRef}></div>,
            showArrow: false,
        },
        {
            key: 'other',
            label:
                <div className='flex width-full justify-start gap-2'>
                    <input
                        type="radio"
                        name="payment"
                        checked={selectedPayment === 'other'}
                        onChange={selectPaymentMethod('other')}
                        id="other"
                        value="other"
                    />
                    {browserType === 'chrome' ? (
                        <Image src={googlePayIcon} alt="" width={48} height={48} />
                    ) : (
                        <Image src={applePayIcon} alt="" width={48} height={48} />
                    )}
                </div>,
            children: <p><Image src={browserIcon} alt="" width={58} height={58} />{text}</p>,
            showArrow: false,
        },
    ];

    useEffect(() => {
        const initStripe = async (amount: number) => {
            const account_id = stripeAccount;
            const stripe = await loadStripe($stripe, { stripeAccount: account_id });
            if (stripe && stripecardRef.current) {
                const elements = stripe.elements({
                    mode: "payment",
                    currency: "usd",
                    amount: amount,
                });

                // Card
                let style = {
                    base: {
                        color: "#041C2C",
                        fontSmoothing: "antialiased",
                        "::placeholder": {
                            fontWeight: "300",
                            color: "#7d7d7d",
                        },
                    },
                    invalid: {
                        color: "#e5424d",
                        ":focus": {
                            color: "#303238",
                        },
                    },
                };

                const card = elements.create("card", { style: style });
                card.mount(stripecardRef.current);
                card.on("change", function (event) {
                    if (event.error) {
                        onError(event.error.message);
                    } else {
                        console.log("Card created.");
                    }
                });
                setPaymentMethod((props) => ({
                    ...props,
                    card: card,
                    stripe: stripe
                }));
            }
        };

        initStripe(amount);

        return () => {
            // unmount function
        };
    }, [stripeAccount, $stripe]);

    return (
        <PaymentOptContainer>
            <Collapse
                defaultActiveKey={['card']}
                activeKey={selectedPayment ? [selectedPayment] : undefined}
                onChange={(value) => setSelectedPayment(value[0])}
                accordion
                items={options}>
            </Collapse>
        </PaymentOptContainer>
    );
};