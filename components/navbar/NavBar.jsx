import dynamic from "next/dynamic";

const Login = dynamic(
    () => {
        return import("../login/Login");
    },
    { ssr: false }
);

export default function NavBar() {
    return (
        <div className={"relative bg-black"}>
            <div className="lg:w-2/3 mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center border-b border-gray_bar_icx py-6 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <a href="/">
                            <span className="sr-only">Performy</span>
                            <img
                                className="h-8 w-auto sm:h-10"
                                src="/performy_logo_2.png"
                                alt="Performy Logo"
                            />
                        </a>
                    </div>
                    <div className={"md:flex space-x-10 group rounded-md inline-flex items-center text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}>
                        <a href="/" className="invisible w-0 md:visible md:w-auto hover:text-light_blue_icx">
                            Home
                        </a>
                        <a href="/resources" className="invisible w-0 md:visible md:w-auto hover:text-light_blue_icx">
                            Resources
                        </a>
                        <a href="/tracker" className="invisible w-0 md:visible md:w-auto hover:text-light_blue_icx">
                            Tracker
                        </a>
                        <Login buttonLabelLoggedIn={"SIGN OUT"} buttonLabelLoggedOut={"SIGN IN"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
