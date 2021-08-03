export default function Button({label, fn}) {
    return <button
        className="inline-flex items-center justify-center p-0.5 bg-gradient-to-r from-white
                        to-gray-500 rounded-md shadow-sm text-white
                        transition duration-150 ease-in-out hover:from-light_blue_icx hover:text-light_blue_icx"
        onClick={fn}>
        <div className={"flex px-6 py-3 rounded-md bg-black"}>
            {label}
        </div>
    </button>
}