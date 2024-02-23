import { PaymentOpts } from "@/app/components/payments";
const constants = require("@/app/constants/index");
import { City } from "@/app/lib/definitions";
import { useState } from "react";

export const PaymentDetails: React.FC<{
    sellerId: string,
    amount: number,
    onError: (errorType: string, errorMsg: string) => void
}> = ({ sellerId, amount, onError }) => {
    const [error, setError] = useState<string | null>(null);
    const cities: City[] = constants.CITIES;
    const account = cities.find((city: any) => city.id === sellerId)?.stripeAccount || '';
    const $stripe: string = constants.STRIPE;
    const userAgent = navigator.userAgent;
    const isSafari = userAgent.includes('Safari/') && !userAgent.includes('Chrome/');
    const isChrome = userAgent.includes('Chrome/');
    const browserType: string = isSafari ? 'safari' : isChrome ? 'chrome' : '';

    const handleStripeError = (errorMessage: string) => {
        onError('payment', errorMessage);
        setError(errorMessage)
    };
    return (
        <div>
            <h1 className="text-1xl font-semibold mb-2">Payment Details</h1>
            <PaymentOpts
                browserType={browserType}
                stripeAccount={account}
                $stripe={$stripe}
                amount={amount}
                onError={handleStripeError}
            />
            <p>{error}</p>
        </div>
    );
};