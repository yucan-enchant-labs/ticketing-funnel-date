'use client'
import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { metaAtom, sessionAtom, ticketAtom } from '@/app/states/common';
import CusHeader from '../../layouts/header';
import { TicketCard } from "@/app/components/cards";
import { ContainerWrapper } from '@/app/styles/container';
import { EncCalendar, EncTime } from '../../selectTicket/calendar';
import { RegCounter } from '@/app/components/counter';
// import { eventTemplate } from '@/app/queries/eventGroups';
const GeneralAdmissionPage: React.FC = () => {
  const meta = useAtomValue(metaAtom);
  const tickets = useAtomValue(ticketAtom);
  const available = useAtomValue(sessionAtom);
  useEffect(() => {
  }, [meta, available])

  //   const [getEvents] = await Promise.all([
  // eventTemplate(meta.city?.id)
  // ]);
  // const eventTemp = eventTemplate(meta.city?.id);
  return (
    <ContainerWrapper>
      <CusHeader city={meta.city} />
      {available.calendar && <EncCalendar calendar={available.calendar} />}
      {available.sessions.length > 0 && <EncTime sessions={available.sessions} timezone={meta.city?.timezone || ''} />}
      {available.selectedSession.length > 0 && <RegCounter tickets={tickets.gaEvents} session={available.selectedSession} />}

      {/* <h1>{`${meta.city?.venueName} : Select Ticket`}</h1> */}
      {/* <TicketCard meta={}  /> */}
    </ContainerWrapper>
  );
};

export default GeneralAdmissionPage;
