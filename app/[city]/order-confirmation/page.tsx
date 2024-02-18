// import GeneralAdmissions from "@/app/ui/[city]/general-admission/page";
import { OrderConfirmationPage } from "@/app/ui/[city]/order-confirmation/page";
// const Page: React.FC<{ meta: MetaProps }> = ({ meta }) => {
const Page: React.FC = () => {
    return (
        <>
            <h1>Order Confirmation</h1>
            <OrderConfirmationPage />
            {/* <NavLinks /> */}
        </>
    );
};

export default Page;
