import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/globals.css"
import AuthProvider from "../context/auth-context";
import favicon from "../public/favicon.ico";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import * as gtag from "../lib/gtag";
import { GA_TRACKING_ID } from "../lib/gtag";


export default function App({Component, pageProps}){
  const router = useRouter();
  let [thisPage, setThisPage] = useState();
  let pathstr="";

  if(router.pathname.indexOf("dashboard") > -1){
    pathstr = "대시보드";
  } else if(router.pathname.indexOf("challenge") > -1){
    pathstr = "챌린지";
  } else if(router.pathname.indexOf("group_watching") > -1){
    pathstr = "단관";
  } else if(router.pathname.indexOf("login") > -1){
    pathstr = "로그인";
  }

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
        <title>{process.env.NODE_ENV==='development' ? '[dev]' : ''}[HBDONF 1116]Soriziller!!!</title>
        <meta property="og:url" content={thisPage}/>
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary"/>
        <link rel="shortcut icon" href={favicon.src} />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
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
      </Head>
      <AuthProvider>
        <Layout>
          <Component {...pageProps}/>
        </Layout>
      </AuthProvider>
    </>
  );
}