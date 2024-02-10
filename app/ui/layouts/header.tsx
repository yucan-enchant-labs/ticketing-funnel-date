import { EncHeader } from "@/app/components/layouts/header";
import { City } from "@/app/lib/definitions";

export default function CusHeader({ city }: { city?: City }) {
    return (
        <main>
            <EncHeader city={city} />
            Get Tickets to Enchant
        </main>
    );
}
