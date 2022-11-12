import Head from "next/head";
import Script from "next/script";
import Layout from "../components/Layout";
import "../styles/globals.css"
import AuthProvider from "../context/auth-context";
import favicon from "../public/favicon.ico";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import * as gtag from "../lib/gtag";
import { GA_TRACKING_ID } from "../lib/gtag";
import { appWithTranslation } from "next-i18next";


function App({Component, pageProps}){
  const router = useRouter();
  let [thisPage, setThisPage] = useState();

  useEffect(() => {
      const thisLink = document.location.href;
      setThisPage(thisLink);
  },[]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>{`[HBDONF-MK]1116 Soriziller Festival`}</title>
        <meta property="og:url" content={thisPage}/>
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <link rel="shortcut icon" href={favicon.src} />
      </Head>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}/>
      <Script 
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <AuthProvider path={router.pathname}>
        <Layout>
          <Component {...pageProps}/>
        </Layout>
      </AuthProvider>
    </>
  );
}

export default appWithTranslation(App);