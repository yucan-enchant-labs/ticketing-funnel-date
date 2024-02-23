'use client'
import { useAtomValue } from 'jotai';
import { flowAtom } from '../states/common';
// import { useRouter } from 'next/navigation';
import { Cities, FlowOpts } from '../components/cities';
import { City } from '@/app/lib/definitions';
// import { Metadata } from 'next';
// export const metadata: Metadata = {
//     title: 'Locations',
// }
const constants = require("@/app/constants/index");
const LocationPage: React.FC = () => {
    const flow = useAtomValue(flowAtom);
    const cities: City[] = constants.CITIES;
    // const handleCityClick = (city: string) => {
    //     router.push(`${city}/general-admission`);
    // };
    return (
        <>
            {!flow && <label htmlFor="Select Flow">Select Flow</label>}
            {!flow && <FlowOpts />}

            {flow && <label htmlFor="Select Locations">Select the Location!</label>}
            {flow && <Cities cities={cities} />}
        </>
    );
};

export default LocationPage;