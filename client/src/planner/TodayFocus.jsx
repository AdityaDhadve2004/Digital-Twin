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
                        {today.title}
                    </h2>

                </div>

                <div
                    className="
                        rounded-2xl
                        bg-[#2B2823]
                        px-6
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

            {/* Study Strategy */}

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

                <h3 className="text-sm uppercase tracking-[0.15em] text-[#D97757]">
                    Study Strategy
                </h3>

                <p className="mt-4 text-lg leading-9 text-[#D8D4CD]">
                    {today.studyStrategy}
                </p>

            </div>

            {/* Topics */}

            <div className="mt-8">

                <h3 className="text-2xl font-semibold text-[#ECE7DF]">
                    Topics To Cover
                </h3>

                <div className="mt-6 space-y-4">

                    {today.topicsToCover.map((topic,index)=>(
                        <div
                            key={index}
                            className="
                                rounded-2xl
                                border
                                border-[#35312C]
                                bg-[#2B2823]
                                p-5
                            "
                        >

                            <div className="flex justify-between items-center">

                                <h4 className="text-xl font-semibold text-[#ECE7DF]">
                                    {topic.topic}
                                </h4>

                                <span
                                    className={`
                                        rounded-full
                                        px-3
                                        py-1
                                        text-xs
                                        font-medium

                                        ${
                                            topic.importance === "Essential"
                                            ? "bg-red-500/20 text-red-400"

                                            : topic.importance === "Important"
                                            ? "bg-orange-500/20 text-orange-400"

                                            : "bg-blue-500/20 text-blue-400"
                                        }
                                    `}
                                >
                                    {topic.importance}
                                </span>

                            </div>

                            <p className="mt-4 leading-8 text-[#CFC8BE]">
                                {topic.reason}
                            </p>

                        </div>
                    ))}

                </div>

            </div>

            {/* Formulae */}

            <div className="mt-10">

                <h3 className="text-2xl font-semibold text-[#ECE7DF]">
                    Important Formulae
                </h3>

                <div className="mt-5 space-y-4">

                    {today.importantFormulas.map((formula,index)=>(

                        <div
                            key={index}
                            className="
                                rounded-xl
                                border
                                border-[#35312C]
                                bg-[#2B2823]
                                p-5
                            "
                        >

                            <h4 className="font-semibold text-[#ECE7DF]">
                                {formula.formula}
                            </h4>

                            <p className="mt-3 text-[#BEB6AB]">
                                {formula.reason}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

            {/* Numerical Types */}

            <div className="mt-10">

                <h3 className="text-2xl font-semibold text-[#ECE7DF]">
                    Numerical Types
                </h3>

                <div className="grid grid-cols-2 gap-4 mt-5">

                    {today.numericalTypes.map((item,index)=>(

                        <div
                            key={index}
                            className="
                                rounded-xl
                                border
                                border-[#35312C]
                                bg-[#2B2823]
                                p-5
                            "
                        >

                            <h4 className="font-semibold text-[#ECE7DF]">
                                {item.type}
                            </h4>

                            <p className="mt-3 text-[#BEB6AB]">
                                {item.reason}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

            {/* Common Mistakes */}

            <div className="mt-10">

                <h3 className="text-2xl font-semibold text-[#ECE7DF]">
                    Common Mistakes
                </h3>

                <div className="mt-5 space-y-5">

                    {today.commonMistakes.map((mistake,index)=>(

                        <div
                            key={index}
                            className="
                                rounded-2xl
                                border
                                border-red-500/20
                                bg-red-500/10
                                p-6
                            "
                        >

                            <h4 className="font-semibold text-red-300">

                                ⚠️ {mistake.mistake}

                            </h4>

                            <p className="mt-4 text-[#ECE7DF]">

                                ✓ {mistake.avoid}

                            </p>

                        </div>

                    ))}

                </div>

            </div>

            {/* Revision */}

            <div
                className="
                    mt-10
                    rounded-2xl
                    border
                    border-green-500/20
                    bg-green-500/10
                    p-6
                "
            >

                <h3 className="text-lg font-semibold text-green-300">

                    Revision Strategy

                </h3>

                <p className="mt-4 text-lg leading-9 text-[#ECE7DF]">

                    {today.revisionStrategy}

                </p>

            </div>

        </section>

    );

}