// import CusHeader from "../ui/Layouts/CusHeader";
// import NavLinks from "../ui/pages/nav-links";
'use client'
import CusHeader from "../ui/layouts/header";
import { useAtomValue } from "jotai";
import { metaAtom, sessionAtom, ticketAtom } from '@/app/states/common';
// import { EncCalendar } from "../ui/dates/calendar";
import { ContainerWrapper } from "../styles/container";
export default function Layout({ children }: { children: React.ReactNode }) {
  const meta = useAtomValue(metaAtom);
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      {/* <div className="w-full flex-none md:w-64"> */}
        <ContainerWrapper>
          <CusHeader city={meta.city} />
      
      {/* <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div> */}
      <div className="w-full flex flex-col gap-8">{children}</div>
      {/* <EncCalendar /> */}

      </ContainerWrapper>
      {/* </div> */}
    </div>
  );
}