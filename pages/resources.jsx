import Head from 'next/head'
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";

export default function Resources() {
    return (
        <div className={"min-h-screen bg-black text-white"}>
            <Head>
                <title>Performy</title>
                <link rel="icon" href="/icx_o.png"/>
            </Head>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Roboto&display=swap" rel="stylesheet"/>
            <NavBar/>
            <div className={"flex flex-col items-center justify-center py-2 text-white pt-36"}>
                <div className="flex flex-col justify-start w-full lg:w-3/5 px-20 text-left">
                    <span className="text-6xl font-bold lg:w-1/2">
                        Guides and resources {' '}
                    </span>

                    <span className="mt-10 text-lg lg:w-1/2">
                        Dive deeper into the ICON Ecosystem.
                    </span>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
