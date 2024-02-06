import { City } from "@/app/lib/definitions";
import { useAtom } from "jotai";
import { useAtomValue } from 'jotai';
import { metaAtom } from '@/app/states/common';
import GeneralAdmissions from "@/app/ui/[city]/general-admission/page";
const Page: React.FC =  async () => {
//   const [meta] = useAtom(metaAtom);

  return (
    <div>
      <h1>Select Ticket</h1>
      {/* <h1>{`${meta} : Select Ticket`}</h1> */}
      <GeneralAdmissions />
    </div>
  );
};

export default Page;
