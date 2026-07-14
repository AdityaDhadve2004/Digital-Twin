export default function PlanCard({ individualPlan, event }) {

    const startDate = new Date(individualPlan.start_date);

    const formattedDate = startDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

    const progress =
        (individualPlan.current_day / individualPlan.duration_days) * 100;

    return (

        <button
            className="
                w-full
                rounded-2xl
                border
                border-[#35312C]
                bg-[#2B2823]
                p-5
                transition-all
                duration-200
                hover:border-[#D97757]
                hover:bg-[#312D28]
                hover:shadow-lg
                text-left
            "
            onClick={() => { event(individualPlan) }}
        >

            {/* Title */}

            <div className="flex items-start justify-between">

                <div>

                    <h3 className="text-lg font-semibold text-[#ECE7DF]">
                        {individualPlan.title}
                    </h3>

                    <p className="mt-1 text-sm text-[#8D857A]">
                        {individualPlan.category}
                    </p>

                </div>

                <span
                    className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-medium

                        ${individualPlan.priority === "HIGH"
                            ? "bg-red-500/15 text-red-400"
                            : individualPlan.priority === "MEDIUM"
                                ? "bg-orange-500/15 text-orange-400"
                                : "bg-emerald-500/15 text-emerald-400"
                        }
                    `}
                >
                    {individualPlan.priority}
                </span>

            </div>

            {/* Stats */}

            <div className="mt-5 flex items-center justify-between text-sm">

                <span className="text-[#A79F95]">
                    {Number(individualPlan.estimated_hours)} hrs/day
                </span>

                <span className="text-[#A79F95]">
                    {individualPlan.duration_days} Days
                </span>

            </div>

            {/* Progress */}

            <div className="mt-5">

                <div className="flex justify-between text-xs text-[#8D857A]">

                    <span>
                        Day {individualPlan.current_day}
                    </span>

                    <span>
                        {individualPlan.duration_days}
                    </span>

                </div>

                <div className="mt-2 h-2 rounded-full bg-[#1D1B18]">

                    <div
                        style={{
                            width: `${progress}%`
                        }}
                        className="
                            h-full
                            rounded-full
                            bg-[#D97757]
                            transition-all
                            duration-500
                        "
                    />

                </div>

            </div>

            {/* Footer */}

            <div className="mt-5 flex items-center justify-between">

                <span className="text-xs text-[#7F786F]">
                    Started {formattedDate}
                </span>

                <span
                    className={`
        text-sm
        font-medium
        ${individualPlan.status === "COMPLETED"
                            ? "text-green-400"
                            : "text-[#D97757]"
                        }
    `}
                >
                    {individualPlan.status === "COMPLETED"
                        ? "✓ Completed"
                        : "Continue →"}
                </span>
            </div>

        </button>

    );

}