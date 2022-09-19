import Footer from "./Footer";
import NavBar from "./NavBar";
import Seo from "./Seo";

export default function Layout({children}){

    return (
        <>
            <Seo/>
            <NavBar/>
            <main>
                {children}
            </main>
            <Footer/>
        </>
    );
}