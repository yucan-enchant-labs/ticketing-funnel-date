import { lusitana } from '@/app/ui/fonts';
// import { Suspense } from 'react';

export default async function Page() {
    // const revenue = await fetchRevenue();
    // const latestInvoices = await fetchLatestInvoices(); // wait for fetchRevenue() to finish
    // const {
    //     numberOfInvoices,
    //     numberOfCustomers,
    //     totalPaidInvoices,
    //     totalPendingInvoices,
    // } = await fetchCardData(); // wait for fetchLatestInvoices() to finish
    // console.log(revenue)
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard123
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                333
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
               333
            </div>
        </main>
    );
}