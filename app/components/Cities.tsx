import { CitiesProps } from "../lib/definitions";
import Link from "next/link";
import { selectCity } from "../hooks/common";
import { RowSBCard, ColCTCard } from "../styles/container";

export const Cities: React.FC<CitiesProps> = ({ cities }) => {
    const { cityMeta } = selectCity();
    return (
        <>
            {cities.map((city) => (
                <Link
                    key={city.key}
                    onClick={() => cityMeta(city)}
                    href={`${city.key}/general-admission`}
                    className="w-full font-sans font-normal text-base normal-nums lining-nums"
                >
                    <ColCTCard >
                        <RowSBCard>
                            <h3 className="inline-block text-lg font-semibold">{city.city}</h3>
                            <p>{city.venueName}</p>
                        </RowSBCard>
                    </ColCTCard>
                </Link>
            ))}
            <Link target="_blank" className="w-full" rel="noopener noreferrer" href={`https://enchantchristmas.com/`}>
                <ColCTCard className="h-[34px] text-base">
                    <RowSBCard>
                        <p>Request Enchant in your City?</p>
                    </RowSBCard>
                </ColCTCard>
            </Link>
        </>
    );
};
