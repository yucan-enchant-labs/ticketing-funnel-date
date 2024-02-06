import { City } from "../lib/definitions";
import { useAtom, useSetAtom } from 'jotai';
import { metaAtom } from '@/app/states/common';
import { eventTemplate } from "../queries/eventGroups";
import { CitiesProps, EventDataProps } from "../lib/definitions";


// const Meta = createContext(null);
export const Cities: React.FC<CitiesProps> = ({ cities, onCityClick }) => {
    const [meta, setMeta] = useAtom(metaAtom);
    const setMetaAtom = useSetAtom(metaAtom);

    const handleCityClick = async (city: City) => {
        try {
            const eventData = await eventTemplate(city.id);
            // if(eventData?.sellerMeta){

            const { sellerMeta, eventTemplates, eventMeta, suiteEventMeta } = eventData;
            console.log(sellerMeta, 'ooo')
            setMetaAtom((prevMeta) => ({
                ...prevMeta,
                city: city,
                sellerMeta: sellerMeta || prevMeta!.sellerMeta,
                eventTemplates: eventTemplates || prevMeta.eventTemplates,
                eventMeta: eventMeta || prevMeta.eventMeta,
                suiteEventMeta: suiteEventMeta || prevMeta.suiteEventMeta,
            }));
            // }

            console.log('123', meta);

            onCityClick(city.key);
        } catch (error) {
            console.error("Error handling city click:", error);
        }
    };
    return (
        <div className="grid grid-cols-1 gap-4">
            {cities.map((city) => (
                <div key={city.key} onClick={() => handleCityClick(city)} className="p-4 border rounded">
                    <h3 className="text-lg font-semibold">{city.city}</h3>
                    <p>{city.venueName}</p>
                </div>
            ))}
        </div>
    )
}