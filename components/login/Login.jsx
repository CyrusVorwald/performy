import { Magic } from 'magic-sdk';
import { IconExtension } from '@magic-ext/icon';
import {Fragment, useEffect, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {LockClosedIcon} from '@heroicons/react/solid'
import Button from "../button/Button";

const magic = new Magic(process.env.MAGIC_SECRET_KEY, {
    extensions: [
        new IconExtension({
            rpcUrl: 'https://bicon.net.solidwallet.io/api/v3',
        }),
    ],
});

export default function Login({buttonLabelLoggedIn, buttonLabelLoggedOut, }) {
    const [email, setEmail] = useState("");
    const [publicAddress, setPublicAddress] = useState("");
    const [userMetadata, setUserMetadata] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        magic.user.isLoggedIn().then(async magicIsLoggedIn => {
            setIsLoggedIn(magicIsLoggedIn);
            if (magicIsLoggedIn) {
                const publicAddress = await magic.icon.getAccount();
                setPublicAddress(publicAddress);
                setUserMetadata(await magic.user.getMetadata());
            }
        });
    }, [isLoggedIn]);

    const login = async () => {
        await magic.auth.loginWithMagicLink({ email });

        setIsLoggedIn(true);
        setIsOpen(false);
    };

    const logout = async () => {
        await magic.user.logout();
        setIsLoggedIn(false);
    };

    return (
        <div>
            {
                !isLoggedIn ? (
                    <Button label={buttonLabelLoggedOut} fn={() => setIsOpen(true)}/>
                ) : (
                    <Button label={buttonLabelLoggedIn} fn={logout}/>
                )
            }

            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    static
                    className="fixed z-10 inset-0 overflow-y-auto"
                    open={isOpen}
                    onClose={setIsOpen}
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
                        </Transition.Child>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom items-center justify-center overflow-hidden bg-dark_gray_button_icx py-12 px-4 sm:px-6 lg:px-8 transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="max-w-lg w-full space-y-8">
                                    <div>
                                        <img
                                            className="mx-auto h-10 w-auto"
                                            src="/performy_logo_2.png"
                                            alt="Logo"
                                        />
                                        <h2 className="mt-6 text-center text-3xl font-bold text-white">Sign into your wallet</h2>
                                    </div>
                                    <div className="rounded-md shadow-sm -space-y-px">
                                        <div>
                                            <label htmlFor="email-address" className="sr-only">
                                                Email address
                                            </label>
                                            <input
                                                id="email-address"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                className="appearance-none rounded-md relative block w-full px-3 py-2 border
                                                border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none
                                                focus:ring-dark_blue_icx focus:border-gray_bar_icx focus:z-10 sm:text-sm"
                                                placeholder="Email address"
                                                onChange={event => {
                                                    setEmail(event.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-white">
                                        <span>We'll send you an email with additional instructions.</span>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent
                                            text-sm font-medium rounded-md text-white bg-dark_blue_icx hover:bg-darker_blue_icx
                                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark_blue_icx"
                                            onClick={login}
                                        >
                                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                                <LockClosedIcon className="h-5 w-5 group-hover:light_gray_button_icx" aria-hidden="true"/>
                                            </span>
                                            Sign in
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}
