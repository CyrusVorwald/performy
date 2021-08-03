import {useState} from "react";
import Loading from "./Loading";
import AuditReport from "./AuditReport";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';



function Audit() {
    const [isLoading, setIsLoading] = useState(false)
    const [urlToAudit, setUrlToAudit] = useState("")
    const [auditResult, setAuditResult] = useState({})
    const [submitted, setSubmitted] = useState(false)

    const handlerAuditUrl = async () => {
        setIsLoading(true)
        let result

        try{
            const res = await fetch(`/api/lighthouse?urlToAudit=${urlToAudit}`)
            result = await res.json()
        } catch (e) {
            result = e
        }

        setAuditResult(result)
        setIsLoading(false)
        setSubmitted(true)
    }

    return (
        <div className={"container"}>
            <div className={"flex md:flex-row items-center justify-center sm:w-full max-w-full mt-16"}>
                <input type="text"
                       placeholder="Enter a web page URL"
                       onChange={event => {
                           setUrlToAudit(event.target.value);
                       }}
                       className="px-3 py-3 placeholder-blueGray-300 text-black relative bg-white bg-white rounded
                       border-0 shadow outline-none focus:outline-none focus:ring md:w-2/3"
                />
                {
                    !isLoading ? (
                        <div>
                            <button type="button"
                                    className="inline-flex items-center justify-center p-0.5 bg-gradient-to-r from-white
                                to-gray-500 rounded-md shadow-sm text-white ml-16
                                transition duration-150 ease-in-out hover:from-light_blue_icx hover:text-light_blue_icx"
                                    onClick={handlerAuditUrl}>
                                <div className={"flex px-6 py-3 rounded-md bg-black"}>
                                    RUN AUDIT
                                </div>
                            </button>
                        </div>
                    ) : (
                        <Loading/>
                    )
                }
            </div>
            {auditResult && (auditResult.name && auditResult.name !== 'LHError' || auditResult.performance_score)  ? (
                <AuditReport report={auditResult}/>
            ) : ( submitted &&
                <div className={"flex justify-center text-red-400 text-left mt-8"}>
                    <ErrorOutlineIcon className={"mr-3"}/>
                    Lighthouse was unable to reliably load the page you requested. Make sure you are testing the
                    correct URL and that the server is properly responding to all requests.
                </div>
            )}
        </div>
    )
}

export default Audit;
