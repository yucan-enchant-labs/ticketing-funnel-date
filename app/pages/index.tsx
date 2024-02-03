import variables from '../styles/variables.module.scss'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'


export default () =>
    <>
        <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" key="viewport" />
            <meta name="robots" content="all" />
            <meta name="keywords" content="Enchant" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://tickets.enchantchristmas.com" />
            <meta property="og:title" content="Enchant Christmas - Buy Tickets" />
            <meta property="og:description"
                content="Choose how you’ll immerse yourself in the magic of Christmas. The classic experience with full access to the Village, Light Maze and Little Ones’ Play Place. Enhance your experience with priority access, exclusive lounges, an exquisite themed dinner, special festive drinks, snacks and more." />
            <meta property="og:image" content="https://enchantchristmas.com/wp-content/uploads/2023/05/Enchant_1200x630.jpg" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Enchant Christmas - Buy Tickets" />
            <meta name="twitter:description"
                content="Choose how you’ll immerse yourself in the magic of Christmas. The classic experience with full access to the Village, Light Maze and Little Ones’ Play Place. Enhance your experience with priority access, exclusive lounges, an exquisite themed dinner, special festive drinks, snacks and more." />
            <meta name="twitter:image" content="https://enchantchristmas.com/wp-content/uploads/2023/05/Enchant_1200x630.jpg" />
            <meta name="theme-color" content="#ffffff" />
            <meta name="msapplication-TileColor" content="#000000" />

            <link rel="icon" href="/favicon.ico" />
            <link rel="shortcut icon" type="image/x-icon" href="/favicon-32x32.png" />
            <link rel="apple-touch-icon" href="/favicon-256-256.png" />
            <title>Enchant Christmas</title>
        </Head>

        <div style={{ color: variables.primaryColor }}>
            Hello world
            Click{' '}
            {/* <Link href="/about"> */}
            {/* <Link href="/about"> */}
            {/* <Link href={{pathname:'/about', query: {name: 'Zzz'}}}> */}
            <Link href={{ pathname: '/about', query: { name: 'Zzz' } }} replace>
                here
            </Link>{' '}
            to read more
        </div>
        <div>
            Click <span onClick={() => Router.push('/about')}>here</span> to read more
        </div>
    </>