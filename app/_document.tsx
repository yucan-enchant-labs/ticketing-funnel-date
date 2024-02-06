// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Metadata } from 'next';

class EncDocument extends Document {
    //   static async getInitialProps(ctx) {
    //     const initialProps = await Document.getInitialProps(ctx);
    //     return { ...initialProps };
    //   }

    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* <meta charset="utf-8" /> */}
                    <meta http-equiv="X-UA-Compatible" content="IE=edge;" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

                    <meta name="robots" content="all" />
                    <meta name="keywords" content="Enchant" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://tickets.enchantchristmas.com" />
                    <meta property="og:image" content="https://enchantchristmas.com/wp-content/uploads/2023/05/Enchant_1200x630.jpg" />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:image" content="https://enchantchristmas.com/wp-content/uploads/2023/05/Enchant_1200x630.jpg" />
                    <meta name="theme-color" content="#ffffff" />
                    <meta name="msapplication-TileColor" content="#000000" />
                    <link href="/favicon.ico" rel="icon" />
                    <link href="/favicon-32x32.png" rel="shortcut icon" type="image/x-icon" />
                    <link href="/favicon-256-256.png" rel="apple-touch-icon" />

                    <script type='text/javascript'
                        src='https://platform-api.sharethis.com/js/sharethis.js#property=646f96448b790100199498ef&product=sop'
                        async></script>
                    <script src="https://js.stripe.com/v3/"></script>

                    {/* Segment Tracking */}


                    {/* <script async>
    let SEGMENT_PROD_ID = "6zABWKEGSJn01Y02cyyEyZnwzRd0xqaG",
      SEGMENT_DEV_ID = "Nt2fI3Ptn9VuOeXbf7CJyGWwi9zAZpmR";

    let SEGMENT_KEY = '<%= NODE_ENV %>' === 'development' || '<%= NODE_ENV %>' == 'Staging' ? SEGMENT_DEV_ID : SEGMENT_PROD_ID;
    !function () {
      var analytics = window.analytics = window.analytics || []; if (!analytics.initialize) if (analytics.invoked) window.console && console.error && console.error("Segment snippet included twice."); else {
        analytics.invoked = !0; analytics.methods = ["trackSubmit", "trackClick", "trackLink", "trackForm", "pageview", "identify", "reset", "group", "track", "ready", "alias", "debug", "page", "once", "off", "on", "addSourceMiddleware", "addIntegrationMiddleware", "setAnonymousId", "addDestinationMiddleware"]; analytics.factory = function (e) { return function () { var t = Array.prototype.slice.call(arguments); t.unshift(e); analytics.push(t); return analytics } }; for (var e = 0; e < analytics.methods.length; e++) { var key = analytics.methods[e]; analytics[key] = analytics.factory(key) } analytics.load = function (key, e) { var t = document.createElement("script"); t.type = "text/javascript"; t.async = !0; t.src = "https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js"; var n = document.getElementsByTagName("script")[0]; n.parentNode.insertBefore(t, n); analytics._loadOptions = e }; analytics._writeKey = SEGMENT_KEY;; analytics.SNIPPET_VERSION = "4.15.3";

        analytics.load(SEGMENT_KEY);
        analytics.page();
        console.log("Segment Loaded: " + SEGMENT_KEY);
      }
    }();
    console.log('Hello, Enchant World!');

  </script> */}
                </Head>
                <body>
                    <script src="https://code.jquery.com/jquery-1.11.3.min.js" defer></script>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default EncDocument;
