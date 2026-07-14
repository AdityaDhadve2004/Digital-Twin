export default function OverviewCard({ plan }) {
    return (
        <section
            className="
                rounded-3xl
                border
                border-[#35312C]
                bg-[#24211D]
                p-8
                shadow-[0_10px_30px_rgba(0,0,0,.18)]
            "
        >

            {/* Header */}

            <div className="flex items-center gap-4">

                <div
                    className="
                        h-12
                        w-12
                        rounded-2xl
                        bg-[#D97757]/15
                        flex
                        items-center
                        justify-center
                        text-2xl
                    "
                >
                    📚
                </div>

                <div>

                    <p className="text-sm font-medium tracking-[0.2em] text-[#D97757] uppercase">
                        Overview
                    </p>

                    <h2 className="mt-1 text-3xl font-semibold text-[#ECE7DF]">
                        Your AI Study Roadmap
                    </h2>

                </div>

            </div>

            {/* Content */}

            <div className="mt-8">

                <p
                    className="
                        text-lg
                        leading-9
                        text-[#C8C1B7]
                    "
                >
                    {plan.daily_plan.overview}
                </p>

            </div>

            {/* Bottom Info */}

            <div
                className="
                    mt-8
                    rounded-2xl
                    border
                    border-[#35312C]
                    bg-[#2B2823]
                    px-6
                    py-5
                "
            >

                <p className="text-sm uppercase tracking-[0.15em] text-[#8A837A]">
                    Digital Twin Insight
                </p>

                <p className="mt-3 text-[#D8D4CD] leading-8">
                    This roadmap has been personalized using your study
                    duration, estimated daily hours, selected priority,
                    and any reference material you provided.
                </p>

            </div>

        </section>
    );
}   