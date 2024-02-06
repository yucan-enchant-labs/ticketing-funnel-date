'use client'
import { useAtomValue } from 'jotai';
import { metaAtom } from '@/app/states/common';
// import { eventTemplate } from '@/app/queries/eventGroups';
const GeneralAdmissionPage: React.FC = () => {
  const meta = useAtomValue(metaAtom);
//   const [getEvents] = await Promise.all([
    // eventTemplate(meta.city?.id)
// ]);
// const eventTemp = eventTemplate(meta.city?.id);
  return (
    <div>
      <h1>{`${meta.city?.venueName} : Select Ticket`}</h1>
    </div>
  );
};

export default GeneralAdmissionPage;
