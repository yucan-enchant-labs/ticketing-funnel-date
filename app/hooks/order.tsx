import { useSetAtom, useAtomValue,WritableAtom } from 'jotai';
import { errorAtom } from '../states/common';
import { selectedTicket } from '../states/order';
import { reserveTickets } from '../apis/order';
import { tempCartProps } from '../types/common';

export const processOrder = async (
    cartId: any,
    tickets: Array<any>,
    session:{ [type: string]: string }
) => {
    const tempCart:Array<tempCartProps> = [];
    tickets.forEach((ticket) => {
        for (let i = 0; i < ticket.qty; i++) {
            tempCart.push({
                ticket_type_id: ticket.id,
                event_session_id: session.ga,
            });
        }
    });
    const resp = await reserveTickets(cartId, tempCart);
    return resp;
};


// export const ensureFreeTicket = async(sellerId:string)=>{
//     try{
//         // need to add addon flow logic
//     }catch(error){
//         console.error(error);
//         throw error;
//     }
// }