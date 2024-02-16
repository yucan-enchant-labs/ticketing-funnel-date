import GeneralAdmissions from "@/app/ui/[city]/general-admission/page";
import NavLinks from "../nav-links";
const Page: React.FC =  async () => {
  return (
    <div>
      <h1>Select Ticket</h1>
      <GeneralAdmissions />
      {/* <NavLinks /> */}
    </div>
  );
};

export default Page;
