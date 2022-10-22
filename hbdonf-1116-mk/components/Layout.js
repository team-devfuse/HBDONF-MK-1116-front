import { useRouter } from "next/router";
import NavBar from "./NavBar";
import Seo from "./Seo";

export default function Layout({children}){
    const router = useRouter();

    return (
        <>
            <Seo/>
            <NavBar/>
            <main className={router.locale}>
                {children}
            </main>
        </>
    );
}