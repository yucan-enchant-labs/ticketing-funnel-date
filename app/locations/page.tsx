
'use client'
import { useRouter } from 'next/navigation';
import { Cities } from '../components/cities';
import { City } from '@/app/lib/definitions';
import { ContainerWrapper } from '../styles/container';
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//     title: 'Locations',
// }

const constants = require("@/app/constants/index");
const LocationPage: React.FC = () => {
    const router = useRouter();

    const cities: City[] = constants.CITIES;

    const handleCityClick = (city: string) => {
        router.push(`${city}/general-admission`);
    };

    return (
        <ContainerWrapper>
            <label htmlFor="Select Locations">Select the Location!</label>
            {/* <Cities cities={cities} onCityClick={handleCityClick} /> */}
            <Cities cities={cities} />
        </ContainerWrapper>
    );
};

export default LocationPage;