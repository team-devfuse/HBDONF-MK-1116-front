import Head from "next/head";

export default function Seo(){
    return (
        <Head>
            <meta name="description" content="yoyo 소리질러~!! 말풍선을 획득해 11월 16일 생일을 맞은 온앤오프 MK의 생일을 축하해보세요!"/>
            <meta property="og:type" content="website"/>
            <meta property="og:title" content="[HBDONF-MK]1116 Soriziller Festival"/>
            <meta property="og:description" content="yoyo 소리질러~!! 말풍선을 획득해 11월 16일 생일을 맞은 온앤오프 MK의 생일을 축하해보세요!"/>
            <meta property="og:image" content="https://d3bjhg9thms238.cloudfront.net/mk_1116/meta_hbdonf_mk.png"/>
            <meta property="og:image:alt" content="[HBDONF-MK]1116 Soriziller Festival"/>
            <meta name="twitter:card" content="summary_large_image"/>
            {/* <meta name="twitter:card" content="summary_large_image"/> */}
            <meta name="twitter:description" content="yoyo 소리질러~!! 말풍선을 획득해 11월 16일 생일을 맞은 온앤오프 MK의 생일을 축하해보세요!"/>
            <meta name="twitter:image" content="https://d3bjhg9thms238.cloudfront.net/mk_1116/meta_hbdonf_mk.png"/>
        </Head>
    );
}