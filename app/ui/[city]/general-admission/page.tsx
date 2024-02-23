'use client'
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { metaAtom, sessionAtom, ticketAtom } from '@/app/states/common';
import { EncCalendar, EncTime } from '../../selectTicket/calendar';
import { RegCounter } from '@/app/components/counter';
import { ReviewTicketButton } from '@/app/components/ui/button';
import { flowAtom } from "@/app/states/common";

const GeneralAdmissionCalendarPage: React.FC = () => {
  const [ticketSelected, setTicketSelected] = useState(false);
  const meta = useAtomValue(metaAtom);
  const tickets = useAtomValue(ticketAtom);
  const available = useAtomValue(sessionAtom);

  return (
    <>
      {available.calendar && <EncCalendar calendar={available.calendar} />}
      {available.sessions.length > 0 && <EncTime sessions={available.sessions} timezone={meta.city?.timezone || ''} />}
      {available.selectedSessionId.length > 0 &&
        <RegCounter tickets={tickets.gaEvents} ticketSelected={setTicketSelected} />}
      {available.selectedSessionId.length > 0 && <ReviewTicketButton
        tickets={tickets.gaEvents}
        sellerId={meta.city?.id}
        city={meta.city?.code}
        session={{ 'ga': available.selectedSessionId }}
        canCheckout={ticketSelected && available.selectedSessionId.length > 0}
      />}
    </>
  );
};

const GeneralAdmissionTicketsPage: React.FC = () => {
  const [ticketSelected, setTicketSelected] = useState(false);
  const meta = useAtomValue(metaAtom);
  const tickets = useAtomValue(ticketAtom);
  const available = useAtomValue(sessionAtom);

  return (
    <>
      <RegCounter tickets={tickets.gaEvents} ticketSelected={setTicketSelected} />
      {available.calendar && ticketSelected && <EncCalendar calendar={available.calendar} />}
      {available.sessions.length > 0 && <EncTime sessions={available.sessions} timezone={meta.city?.timezone || ''} />}
      <ReviewTicketButton
        tickets={tickets.gaEvents}
        sellerId={meta.city?.id}
        city={meta.city?.code}
        session={{ 'ga': available.selectedSessionId }}
        canCheckout={ticketSelected&&available.selectedSessionId.length > 0}
      />
    </>
  );
};

const  GeneralAdmissionPage:React.FC = () => {
  const flow = useAtomValue(flowAtom);
  return flow == 'calendar' ? <GeneralAdmissionCalendarPage /> : <GeneralAdmissionTicketsPage />;
};
// export {GeneralAdmissionCalendarPage, GeneralAdmissionTicketsPage};
export default GeneralAdmissionPage;