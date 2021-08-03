function Loading() {
    return (
        <div>
            <button type="button"
                    className="inline-flex items-center justify-center p-0.5 bg-gradient-to-r from-light_blue_icx
                    to-gray-500 rounded-md shadow-sm text-light_blue_icx ml-16"
            >
                <div className={"flex px-6 py-3 rounded-md bg-black"}>
                    RUN AUDIT
                    <svg className="animate-spin h-5 w-5 ml-4 ..." viewBox="0 0 24 24">
                        <circle
                            className="ring-track"
                            fill="transparent"
                            strokeWidth="6px"
                            stroke="#31F1F5"
                            cx="50" cy="50"
                            r="44"
                        />
                        <circle
                            className="loader-ring"
                            fill="transparent"
                            strokeWidth="6px"
                            stroke="#31F1F5"
                            strokeDashoffset="276.460"
                            strokeDasharray="276.460 276.460"
                            cx="50"
                            cy="50"
                            r="44"
                        />
                    </svg>
                </div>
            </button>
        </div>
    )
}

export default Loading;
