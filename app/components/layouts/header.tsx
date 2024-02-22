'use client'
import Image from 'next/image';
import { RowSBCard, RowFSCard } from "@/app/styles/container";
import encLogo from "@/app/assets/images/logos/logo-sm.png";
import { City } from '@/app/lib/definitions';

interface EncHeaderProps {
    city?: City;
}

export const EncHeader: React.FC<EncHeaderProps> = ({ city }) => {
    const code = city?.code || '';
    return (
        <RowSBCard>
            <RowFSCard className='gap-2'>
                <Image src={encLogo} alt="" width={20} height={20} />
                <p>{code.toLocaleUpperCase()}</p>
            </RowFSCard>
        </RowSBCard>
    );
};
