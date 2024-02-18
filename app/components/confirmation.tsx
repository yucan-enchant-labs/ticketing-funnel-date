import { useEffect } from 'react';
import { useState } from 'react';
import { checkoutResultAtom } from "../states/order";
import { useAtomValue } from "jotai";
import { Button } from "@/app/components/ui/button";
import { fetchRespData } from '../apis/order';

const constants = require("@/app/constants/index");
const ticketureAPI = constants.TICKETURE_CACHE_API;

export const OrderConfirmationCard: React.FC = () => {
    const [viewTicketLink, setViewTicketLink] = useState<string | URL | undefined>();
    const [fetchResp, setFetchResp] = useState<any>(null);
    const resp = useAtomValue(checkoutResultAtom);
    useEffect(() => {
        if (resp) {
            const handleResp = async () => {
                const orderId = resp.ticket_order._data[0].id;
                const ticketureOrderId = { ticketureOrderId: orderId };
                const link = `${ticketureAPI}/ticket_order/${orderId}`;
                setViewTicketLink(link);
                const respData = await fetchRespData(ticketureOrderId);
                setFetchResp(respData.data.ticketureOrderContext);
            };

            handleResp();
        } else {
            goToEnchant();
        }

    }, [resp]);

    const viewTicket = () => {
        window.open(viewTicketLink, '_blank');
        window.opener = null;
    };
    const goToEnchant = () => {
        const link = "https://enchantchristmas.com";
        window.location.href = link;
    };

    console.log('here RESP:', resp);

    return (
        <>
            {fetchResp && (
                <div>
                    <div className="max-w-sm mx-auto my-12 p-6 bg-white rounded-lg shadow-md">
                        <div className="flex justify-center">
                            <CheckIcon className="text-green-500 w-16 h-16" />
                        </div>
                        <h1 className="mt-4 mb-4 text-center text-4xl font-bold">Done!</h1>
                        <p className="text-xl text-center font-semibold mb-4">We look forward to your visit</p>
                        <p className="mt-4 text-center">
                            We emailed your order confirmation to{" "}
                            <a className="text-blue-600" href="#">
                                {fetchResp.identity_email}
                            </a>
                            .
                        </p>
                        <p className="mt-4 text-center">Thank you for your purchase.</p>
                        <p className="mt-4 text-center font-medium">
                            Your Experience Order Number is <br />
                            <span className='font-semibold'>{fetchResp.ticket_order_number}</span>
                        </p>
                        <div className="mt-6 flex justify-center">
                            <img
                                alt="QR Code"
                                className="h-48 w-48"
                                height="200"
                                src="/placeholder.svg"
                                style={{
                                    aspectRatio: "200/200",
                                    objectFit: "cover",
                                }}
                                width="200"
                            />
                        </div>
                    </div>
                    <Button onClick={viewTicket}>
                        View Tickets
                    </Button>
                </div>

            )}

        </>
    );
};

const CheckIcon = (props: any) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}