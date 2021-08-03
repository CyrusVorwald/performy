import {useState} from "react";
import Gauge from "../gauge/gauge";
import {Magic} from "magic-sdk";
import {IconExtension} from "@magic-ext/icon";
import IconService from "icon-sdk-js";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const { IconBuilder, IconAmount, IconConverter } = IconService;

const magic = new Magic(process.env.MAGIC_SECRET_KEY, {
    extensions: [
        new IconExtension({
            rpcUrl: 'https://bicon.net.solidwallet.io/api/v3',
        }),
    ],
});

function AuditReport({report}) {
    const [sendAlert, setSendAlert] = useState(false);
    const [messageTxHash, setMessageTxHash] = useState("");

    const handlerMessageTransaction = async () => {
        console.log(`called handlerMessageTransaction, magic.user.isLoggedIn(): ${await magic.user.isLoggedIn()}`)
        if (!await magic.user.isLoggedIn()) {
            setSendAlert(true)
        } else {
            setSendAlert(false)
            const metadata = await magic.user.getMetadata();
            const message = JSON.stringify({'URL': report.urlToAudit, 'Performance': report.performance_score * 100,
                'Accessibility': report.performance_score * 100, 'Best Practices': report.best_practices_score * 100,
                'SEO': report.seo_score * 100, 'PWA': report.pwa_score * 100})

            const txObj = new IconBuilder.MessageTransactionBuilder()
                .from(metadata.publicAddress)
                .to(metadata.publicAddress)
                .stepLimit(IconConverter.toBigNumber(1000000).toString())
                .nid(IconConverter.toBigNumber(3).toString())
                .nonce(IconConverter.toBigNumber(1).toString())
                .version(IconConverter.toBigNumber(3).toString())
                .timestamp((new Date()).getTime() * 1000)
                .data(IconConverter.fromUtf8(message))
                .build()

            const tx_hash = await magic.icon.sendTransaction(txObj);

            setMessageTxHash({tx_hash});
            await new Promise(r => setTimeout(r, 1000));
            window.open(`https://bicon.tracker.solidwallet.io/transaction/${tx_hash}`,'_blank');
        }
    };

    return (
        <div className={"mt-16"}>
            <span className={"text-gray_text_icx  text-4xl font-semibold tracking-tight"}>{report.urlToAudit}</span>
            <div className={"flex flex-col gap-y-10 items-center justify-center md:flex-row md:gap-x-16 mt-16"}>
                <Gauge value={report.performance_score * 100} label={"Performance"}/>
                <Gauge value={report.accessibility_score * 100} label={"Accessibility"}/>
                <Gauge value={report.best_practices_score * 100} label={"Best Practices"}/>
                <Gauge value={report.seo_score * 100} label={"SEO"}/>
                <Gauge value={report.pwa_score * 100} label={"PWA"}/>
                <button type="button"
                        className="inline-flex items-center justify-center p-0.5 bg-gradient-to-r from-white
                                to-gray-500 rounded-md shadow-sm text-white
                                transition duration-150 ease-in-out hover:from-light_blue_icx hover:text-light_blue_icx"
                        onClick={handlerMessageTransaction}>
                    <div className={"flex px-6 py-3 rounded-md bg-black"}>
                        SHARE
                        <svg className={"animate-bounce w-5 h-5 ml-2"} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5.41177 7.49221C5.02192 7.49221 4.70588 7.80824 4.70588 8.19809C4.70588 8.58794 5.02192 8.90397 5.41177 8.90397L13.59 8.90397L10.3028 12.1912C10.0271 12.4668 10.0271 12.9138 10.3028 13.1894C10.5784 13.4651 11.0254 13.4651 11.301 13.1894L15.7933 8.69722C16.0689 8.42156 16.0689 7.97462 15.7933 7.69896L11.301 3.20675C11.0254 2.93108 10.5784 2.93108 10.3028 3.20675C10.0271 3.48241 10.0271 3.92935 10.3028 4.20502L13.59 7.49221H5.41177ZM0.705882 7.49223C0.316034 7.49223 0 7.80826 0 8.19811C0 8.58796 0.316034 8.90399 0.705882 8.90399H2.58824C2.97808 8.90399 3.29412 8.58796 3.29412 8.19811C3.29412 7.80826 2.97808 7.49223 2.58824 7.49223H0.705882Z" fill="#31F2F7"/>
                            </g>
                        </svg>
                    </div>
                </button>
            </div>
            {( sendAlert &&
                <div className={"flex justify-center text-red-400 text-left mt-8"}>
                    <ErrorOutlineIcon className={"mr-3"}/>
                    Magic was unable to find a user login. Make sure you are signed in, then try again.
                </div>
            )}
        </div>
    )
}

export default AuditReport;
