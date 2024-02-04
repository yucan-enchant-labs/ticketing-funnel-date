import { City } from "../lib/definitions";

interface CitiesProps {
    cities: City[];
    onCityClick: (city: string) => void;
}

export const Cities: React.FC<CitiesProps> = ({ cities, onCityClick }) => {
    return (
        <div className="grid grid-cols-1 gap-4">
            {cities.map((city) => (
                <div key={city.name} onClick={() => onCityClick(city.city)} className="p-4 border rounded">
                    <h3 className="text-lg font-semibold">{city.name}</h3>
                    <p>{city.venue}</p>
                </div>
            ))}
        </div>
    )
}