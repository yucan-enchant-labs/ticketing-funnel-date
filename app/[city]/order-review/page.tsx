// import GeneralAdmissions from "@/app/ui/[city]/general-admission/page";
import RevewOrderPage from "@/app/ui/[city]/review-order/page";
import NavLinks from "../nav-links";
import { MetaProps } from "@/app/types/state";
// const Page: React.FC<{ meta: MetaProps }> = ({ meta }) => {
const Page: React.FC = () => {

  return (
    <>
      <h1>Review Order</h1>
      <RevewOrderPage />
      {/* <NavLinks /> */}
    </>
  );
};

export default Page;
