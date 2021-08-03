import Head from 'next/head'
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";
import Vision from "../components/vision/Vision";
import Steps from "../components/steps/Steps";
import dynamic from 'next/dynamic'

const Audit = dynamic(
    () => {
        return import("../components/audit/Audit");
    },
    { ssr: false }
);

export default function Home() {
    return (
        <div>
            <Head>
                <title>Performy</title>
                <link rel="icon" href="/icx_o.png"/>
            </Head>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Roboto&display=swap" rel="stylesheet"/>
            <NavBar/>
            <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white pt-36">
                <main className="flex flex-col items-center justify-center w-full lg:w-3/5 flex-1 px-20 text-center">
                    <h1 className="text-6xl font-bold">
                        The decentralized web performance testing service {' '}
                        <span className={"text-light_blue_icx"}>
                        for ICON
                    </span>
                    </h1>

                    <p className="mt-10 text-lg">
                        Performy provides auditors a <span className={"font-semibold"}>trustless website performance testing service.</span>
                        {' '} Connect your wallet to record your result in a SCORE transaction message.
                    </p>
                    <Audit/>
                </main>
                <Steps/>
                <Vision/>
                <Footer/>
            </div>
        </div>
    )
}
