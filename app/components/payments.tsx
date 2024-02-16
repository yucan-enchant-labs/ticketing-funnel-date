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
    console.log(browserType, stripeAccount, $stripe, amount)
    const { Panel } = Collapse;
    const text = `After clicking "Pay with ${browserType === "chrome" ? "Google" : "Apple"
        } Pay" you will be redirected to ${browserType === "chrome" ? "Google" : "Apple"
        } Pay complete your purchase securely`;

    const options: CollapseProps['items'] = [
        {
            key: 'card',
            label: 'Credit Card',
            children: <p>Credit Card</p>,
        },
        {
            key: 'otherPaymnent',
            label: 'Other Paymnent',
            children: <p>{text}</p>,
        },
    ];

    const selectPaymentMethod = (method: string) => {

        console.log(selectedPayment,'sls')
        return () => {
            setPaymentMethod((props)=>({
                ...props,
                type: method,
            }));
            setSelectedPayment(method);
            // setOtherPanelOpen(!otherPanelOpen);
            // setCardPanelOpen(false);
        };
    };

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
                setPaymentMethod((props)=>({
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
            >
                <Panel
                    showArrow={false}
                    header={<div className='flex width-full justify-start gap-2'>
                    <input
                        type="radio"
                        name="payment"
                        checked={selectedPayment === 'card'}
                        onChange={selectPaymentMethod('card')}
                        id="card"
                        value="card"
                    />
                    <label htmlFor="card">Credit Card</label>
                </div>} key="card">
                    <StripeContainer>
                        <div ref={stripecardRef}></div>
                    </StripeContainer>
                </Panel>

                {browserType === 'chrome' || browserType === 'safari' ? (
                    <Panel
                        showArrow={false}
                        header={<div className='flex width-full justify-start gap-2'>
                        <input
                            type="radio"
                            name="payment"
                            checked={selectedPayment === 'otherPaymnent'}
                            onChange={selectPaymentMethod('otherPaymnent')}
                            id="otherPaymnent"
                            value="otherPaymnent"
                        />
                        {browserType === 'chrome' ? (
                            <Image src={googlePayIcon} alt="" width={48} height={48} />
                        ) : (
                            <Image src={applePayIcon} alt="" width={48} height={48} />
                        )}
                    </div>} key="other">
                        <StripeContainer>
                            <Image src={browserIcon} alt="" width={58} height={58} />
                            {text}
                        </StripeContainer>
                    </Panel>
                ) : null}
            </Collapse>
        </PaymentOptContainer>
    );
};