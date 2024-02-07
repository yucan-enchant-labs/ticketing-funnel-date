import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from "next";
// import GlobalStyle from '@/app/styles/index';
import '@/app/styles/index.css'


export const metadata: Metadata = {
    title: {
        template: '%s | Enchant Christmas',
        default: 'Enchant Christmas - Buy Tickets',
    },
    description: 'Choose how you’ll immerse yourself in the magic of Christmas. The classic experience with full access to the Village, Light Maze and Little Ones’ Play Place. Enhance your experience with priority access, exclusive lounges, an exquisite themed dinner, special festive drinks, snacks and more.',
    metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className} anek_tlg`}>{children}</body>
        </html>
    )
}