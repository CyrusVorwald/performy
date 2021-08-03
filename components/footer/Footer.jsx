import React from "react";
function Footer() {
    return (
        <>
            <div className="text-white bg-black">
                <div className="mx-auto container flex flex-col items-center justify-center border-t border-gray_bar_icx">
                    <a href={"/"}>
                        <img src="/performy_logo_2.png" alt="Performy Logo" className="h-16 mt-5" />
                    </a>
                    <div className="flex flex-col md:items-center f-f-l pt-3">
                        <div className="my-6 text-base text-light_gray_text_icx f-f-l">
                            <ul className="md:flex items-center">
                                <li className=" md:mr-6 cursor-pointer pt-4 lg:py-0 hover:text-white"><a href={'/'}>Home</a></li>
                                <li className=" md:mr-6 cursor-pointer pt-4 lg:py-0 hover:text-white"><a href={'/resources'}>Resources</a></li>
                                <li className=" md:mr-6 cursor-pointer pt-4 lg:py-0 hover:text-white"><a href={'/tracker'}>Tracker</a></li>
                                <li className="cursor-pointer pt-4 lg:py-0 hover:text-white"><a href={'/'}>Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div className="text-sm text-color mb-10 f-f-l">
                            <p> © 2021 Performy. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;
