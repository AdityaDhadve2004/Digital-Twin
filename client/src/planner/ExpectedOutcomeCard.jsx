export default function ExpectedOutcomeCard({ plan }) {
    return (
        <section
            className="
                rounded-3xl
                border
                border-[#D97757]/20
                bg-gradient-to-br
                from-[#24211D]
                to-[#2B2823]
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
                    🎯
                </div>

                <div>

                    <p className="text-sm font-medium tracking-[0.2em] text-[#D97757] uppercase">
                        Expected Outcome
                    </p>

                    <h2 className="mt-1 text-3xl font-semibold text-[#ECE7DF]">
                        Where This Plan Leads
                    </h2>

                </div>

            </div>

            {/* Main Outcome */}

            <div className="mt-8">

                <p
                    className="
                        text-lg
                        leading-9
                        text-[#CFC8BE]
                    "
                >
                    {plan.daily_plan.expectedOutcome}
                </p>

            </div>

            {/* Success Box */}

            <div
                className="
                    mt-8
                    rounded-2xl
                    border
                    border-[#D97757]/20
                    bg-[#D97757]/10
                    p-6
                "
            >

                <div className="flex items-start gap-4">

                    <div className="text-3xl">
                        🚀
                    </div>

                    <div>

                        <h3 className="text-lg font-semibold text-[#ECE7DF]">
                            Success Criteria
                        </h3>

                        <p className="mt-3 leading-8 text-[#D8D4CD]">
                            Complete every study day in sequence and actively
                            practice the concepts instead of only reading them.
                            Your Digital Twin will use your progress to prepare
                            future recommendations and more accurate study plans.
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}