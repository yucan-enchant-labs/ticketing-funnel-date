'use client'
import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { metaAtom, sessionAtom, ticketAtom } from '@/app/states/common';
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
    <>
    {available.calendar && <EncCalendar calendar={available.calendar} />}
      {available.sessions.length > 0 && <EncTime sessions={available.sessions} timezone={meta.city?.timezone || ''} />}
      {available.selectedSessionId.length > 0 &&
        <RegCounter
          city={meta.city?.code}
          tickets={tickets.gaEvents}
          session={{ 'ga': available.selectedSessionId }}
          sellerId={meta.city?.id}
        />}
    </>
  );
};

export default GeneralAdmissionPage;
