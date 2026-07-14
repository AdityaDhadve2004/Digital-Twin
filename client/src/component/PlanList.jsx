import PlanCard from "./PlanCard";

export default function PlanList({ event, plans = [] }) {
    return (
        <div
            className="
                h-[calc(100vh-90px)]
                rounded-3xl
                border
                border-[#35312C]
                bg-[#24211D]
                shadow-[0_15px_40px_rgba(0,0,0,.25)]
                overflow-hidden
                flex
                flex-col
            "
        >
            {/* Header */}

            <div className="px-7 py-6 border-b border-[#35312C]">

                <div className="flex items-center justify-between">

                    <div>

                        <h2 className="text-2xl font-semibold text-[#ECE7DF]">
                            Study Plans
                        </h2>

                        <p className="mt-1 text-sm text-[#A79F95]">
                            Continue where you left off.
                        </p>

                    </div>

                    <div
                        className="
                            h-11
                            min-w-11
                            rounded-xl
                            bg-[#2B2823]
                            border
                            border-[#35312C]
                            flex
                            items-center
                            justify-center
                            text-[#D97757]
                            font-semibold
                        "
                    >
                        {plans.length}
                    </div>

                </div>

            </div>

            {/* List */}

            <div
                className="
                    flex-1
                    overflow-y-auto
                    px-5
                    py-5
                    space-y-4
                    scrollbar-thin
                    scrollbar-thumb-[#3B3832]
                    scrollbar-track-transparent
                "
            >

                {plans.length ? (

                    plans.map((plan) => (

                        <PlanCard
                            event={event}
                            key={plan.id}
                            individualPlan={plan}
                        />

                    ))

                ) : (

                    <div className="h-full flex items-center justify-center">

                        <div className="max-w-xs text-center">

                            <div className="text-6xl">
                                🧠
                            </div>

                            <h3 className="mt-5 text-xl font-semibold text-[#ECE7DF]">
                                No Study Plans Yet
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-[#A79F95]">
                                Generate your first AI-powered study roadmap.
                                Every plan you create will appear here for
                                quick access.
                            </p>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}