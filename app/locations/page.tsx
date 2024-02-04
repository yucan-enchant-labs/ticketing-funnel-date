
'use client'
import { useRouter } from 'next/navigation';
import { Cities } from '../components/Cities';
import { City } from '@/app/lib/definitions';
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//     title: 'Locations',
// }

const LocationPage: React.FC = () => {
    const router = useRouter();

    const cities: City[] = [
        { name: 'Washington, DC', venue: 'The W Park', code: 'wdc', sellerId: '90282123', city: 'washington-dc' },
        { name: 'Saint Jose', venue: 'Paypal Park', code: 'sjo', sellerId: '123123', city: 'saint-jose' },
    ];

    const handleCityClick = (city: string) => {
        router.push(`${city}/general-admission`);
    };

    return (
        <main>
            <label htmlFor="Select Locations">Select the Location!</label>
            <Cities cities={cities} onCityClick={handleCityClick} />
        </main>
    );
};

export default LocationPage;