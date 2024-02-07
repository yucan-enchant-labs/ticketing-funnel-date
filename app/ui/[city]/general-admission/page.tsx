'use client'
import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { metaAtom } from '@/app/states/common';
import { TicketCard } from "@/app/components/cards";
// import { eventTemplate } from '@/app/queries/eventGroups';
const GeneralAdmissionPage: React.FC = () => {
  const meta = useAtomValue(metaAtom);
  useEffect(()=>{
    console.log('lsisi', meta);
  }, [meta])
  
//   const [getEvents] = await Promise.all([
    // eventTemplate(meta.city?.id)
// ]);
// const eventTemp = eventTemplate(meta.city?.id);
  return (
    <div>
      <h1>{`${meta.city?.venueName} : Select Ticket`}</h1>
      {/* <TicketCard meta={}  /> */}
    </div>
  );
};

export default GeneralAdmissionPage;
