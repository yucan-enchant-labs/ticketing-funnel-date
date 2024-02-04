import LocationPage from "./locations/page"
import { City } from "./lib/definitions";
// import Dates from './pages/dates/page';
import Link from 'next/link';
import NavLinks from "./[city]/nav-links";
export default function Page() {
    const cities: City[] = [
        { name: 'Washington, DC', venue: 'The W Park', code: 'wdc', sellerId: '90282123', city:'washington-dc' },
        { name: 'Saint Jose', venue: 'Paypal Park', code: 'sjo', sellerId: '123123', city:'saint-jose' },
    ]
    return (
        <main>
            123
            <LocationPage />
            {/* <Dates /> */}
            <Link
                href="/dates"
                className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            ><span>Dates</span>
            </Link>

          <NavLinks />
        </main>
    )
}