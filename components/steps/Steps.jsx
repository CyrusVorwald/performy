const features = [
    {
        name: 'Measure',
        description:
            'Your site is measured using Lighthouse, Google\'s open source performance auditing solution.',
    },
    {
        name: 'Connect',
        description:
            'Performy integrates with Magic to provide a simple, passwordless wallet accessible via email.',
    },
    {
        name: 'Share',
        description:
            'Write your audit report to the ICON blockchain.',
    },
]

export default function Steps() {
    return (
        <div className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mt-10">
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                        {features.map((feature, index) => (
                            <div key={feature.name} className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-full
                                    text-dark_blue_icx border-2 border-dark_blue_icx font-bold text-lg">
                                        {index + 1}
                                    </div>
                                    <p className="ml-16 text-2xl leading-6 font-bold text-dark_blue_icx">{feature.name}</p>
                                </dt>
                                <dd className="mt-2 ml-16">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}