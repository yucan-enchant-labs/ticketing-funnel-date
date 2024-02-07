// Cities.tsx
import { City } from "../lib/definitions";
import { CitiesProps } from "../lib/definitions";
import Link from "next/link";
import { selectCity } from "../hooks/common";
import { RowSBCard, ColCTCard } from "../styles/container";

export const Cities: React.FC<CitiesProps> = ({ cities }) => {
    const { cityMeta } = selectCity();
    return (
        <>
            {cities.map((city) => (
                <ColCTCard key={city.key} onClick={() => cityMeta(city)}>
                    <RowSBCard>
                        <Link
                            href={`${city.key}/general-admission`}
                            className="font-sans font-normal text-base normal-nums lining-nums hover:text-xl"
                        >
                            <h3 className="inline-block text-lg font-semibold">{city.city}</h3>
                            <p>{city.venueName}</p>
                        </Link>
                    </RowSBCard>
                </ColCTCard>

            ))}
        </>
    );
};
