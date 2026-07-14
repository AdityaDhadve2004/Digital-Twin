export default function TimelineDay({ day, currentDay }) {

    const completed = day.day < currentDay;

    const active = day.day === currentDay;

    return (

        <div className="flex-1 flex flex-col items-center relative">

            {/* Line */}

            {day.day !== 1 && (

                <div
                    className={`
                        absolute
                        top-5
                        -left-1/2
                        w-full
                        h-[3px]

                        ${
                            completed
                                ? "bg-green-400"
                                : "bg-[#35312C]"
                        }
                    `}
                />

            )}

            {/* Circle */}

            <div
                className={`
                    relative
                    z-10
                    h-10
                    w-10
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-sm
                    font-semibold
                    transition-all

                    ${
                        completed
                            ? "bg-green-500 text-white"
                            : active
                            ? "bg-[#D97757] text-white scale-110 shadow-lg"
                            : "bg-[#2B2823] border border-[#35312C] text-[#A79F95]"
                    }
                `}
            >

                {completed ? "✓" : day.day}

            </div>

            {/* Label */}

            <p className="mt-4 text-sm font-medium text-[#ECE7DF]">

                Day {day.day}

            </p>

            <p className="mt-2 text-xs text-center text-[#8A837A] max-w-[100px]">

                {day.title}

            </p>

        </div>

    );

}