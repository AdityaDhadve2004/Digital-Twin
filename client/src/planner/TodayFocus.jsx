export default function TodayFocus({ plan }) {

    const today = plan.daily_plan.days.find(
        (day) => day.day === plan.current_day
    );

    return (

        <section
            className="
                rounded-3xl
                border
                border-[#D97757]/20
                bg-[#24211D]
                p-8
                shadow-[0_10px_30px_rgba(0,0,0,.18)]
            "
        >

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <div
                        className="
                            inline-flex
                            rounded-full
                            bg-[#D97757]/15
                            px-4
                            py-2
                            text-xs
                            font-medium
                            tracking-[0.18em]
                            uppercase
                            text-[#D97757]
                        "
                    >
                        Today's Focus
                    </div>

                    <h2 className="mt-5 text-4xl font-semibold text-[#ECE7DF]">
                        Day {today.day}
                    </h2>

                </div>

                <div
                    className="
                        rounded-2xl
                        bg-[#2B2823]
                        px-5
                        py-4
                        text-center
                    "
                >

                    <p className="text-xs uppercase tracking-widest text-[#8A837A]">
                        Estimated Time
                    </p>

                    <h3 className="mt-2 text-3xl font-semibold text-[#ECE7DF]">
                        {today.estimatedHours} hrs
                    </h3>

                </div>

            </div>

            {/* Title */}

            <div className="mt-10">

                <h3 className="text-3xl font-semibold text-[#ECE7DF]">
                    {today.title}
                </h3>

            </div>

            {/* Objective */}

            <div
                className="
                    mt-8
                    rounded-2xl
                    border
                    border-[#35312C]
                    bg-[#2B2823]
                    p-6
                "
            >

                <p className="text-sm uppercase tracking-[0.15em] text-[#D97757]">
                    Objective
                </p>

                <p className="mt-4 text-lg leading-8 text-[#D8D4CD]">
                    {today.objective}
                </p>

            </div>

            {/* Description */}

            <div
                className="
                    mt-6
                    rounded-2xl
                    border
                    border-[#35312C]
                    bg-[#2B2823]
                    p-6
                "
            >

                <p className="text-sm uppercase tracking-[0.15em] text-[#D97757]">
                    Study Plan
                </p>

                <p className="mt-4 text-lg leading-9 text-[#CFC8BE]">
                    {today.description}
                </p>

            </div>

            {/* Motivation */}

            <div
                className="
                    mt-6
                    rounded-2xl
                    border
                    border-green-500/20
                    bg-green-500/10
                    p-6
                "
            >

                <div className="flex items-start gap-4">

                    <div className="text-3xl">
                        💡
                    </div>

                    <div>

                        <p className="text-sm uppercase tracking-[0.15em] text-green-400">
                            Motivation
                        </p>

                        <p className="mt-3 text-lg leading-8 text-[#ECE7DF]">
                            {today.motivation}
                        </p>

                    </div>

                </div>

            </div>

        </section>

    );

}