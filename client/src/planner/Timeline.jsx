import TimelineDay from "./TimelineDay";
export default function Timeline({ plan }) {

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

            <div>

                <div
                    className="
                        inline-flex
                        rounded-full
                        bg-[#302C27]
                        px-4
                        py-2
                        text-xs
                        font-medium
                        tracking-wider
                        text-[#D97757]
                    "
                >
                    Progress
                </div>

                <h2 className="mt-5 text-4xl font-semibold text-[#ECE7DF]">
                    Study Timeline
                </h2>

                <p className="mt-3 text-lg text-[#A79F95]">
                    Track your progress through the AI-generated roadmap.
                </p>

            </div>

            <div className="mt-14 flex justify-between items-center">

                {plan.daily_plan.days.map((day) => (

                    <TimelineDay
                        key={day.day}
                        day={day}
                        currentDay={plan.current_day}
                    />

                ))}

            </div>

        </section>

    );

}