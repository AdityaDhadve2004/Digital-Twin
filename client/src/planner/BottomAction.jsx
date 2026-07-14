import { useRevalidator } from "react-router-dom";
import { changeCurrentDayInDatabase,changePlanStatusInDatabase } from "../api";
export default function BottomAction({ plan }) {
    const { revalidate } = useRevalidator();
    async function handleContinue(id) {
        const res = await changeCurrentDayInDatabase(id);
        if (res) {
            revalidate();
        }
    }
    async function handleComplete(id) {
        const res = await changePlanStatusInDatabase(id);
        if (res) {
            revalidate();
        }
    }

    const isLastDay = plan.current_day === plan.duration_days;

    const isFinished =
        plan.status === "COMPLETED" ||
        plan.status === "FAILED";

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

            {
                isFinished ? (

                    <div className="text-center">

                        <div className="text-6xl">
                            🎉
                        </div>

                        <h2 className="mt-6 text-4xl font-semibold text-[#ECE7DF]">
                            Study Roadmap Finished
                        </h2>

                        <p className="mt-4 max-w-2xl mx-auto text-lg leading-8 text-[#A79F95]">
                            Your Digital Twin has successfully recorded
                            the completion of this roadmap.
                            Continue building consistency with your next goal.
                        </p>

                    </div>

                ) : (

                    <>

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="text-3xl font-semibold text-[#ECE7DF]">

                                    {
                                        isLastDay
                                            ? "Ready to Finish?"
                                            : "Ready for Tomorrow?"
                                    }

                                </h2>

                                <p className="mt-3 text-lg leading-8 text-[#A79F95]">

                                    {
                                        isLastDay
                                            ? "Complete this roadmap once today's study is finished."
                                            : "Once you've completed today's work, move to the next study day."
                                    }

                                </p>

                            </div>

                            {isLastDay ? (

                                <button
                                    className="
        rounded-2xl
        bg-[#D97757]
        px-8
        py-4
        font-semibold
        text-white
        transition-all
        duration-200
        hover:bg-[#C86645]
        hover:scale-[1.02]
        active:scale-95
        shadow-[0_10px_20px_rgba(217,119,87,0.25)]
    "
                                    onClick={() => handleComplete(plan.id)}
                                >
                                    Complete Roadmap
                                </button>

                            ) : (

                                <button
                                    className="
        rounded-2xl
        bg-[#D97757]
        px-8
        py-4
                       font-semibold
        text-white
        transition-all
        duration-200
        hover:bg-[#C86645]
        hover:scale-[1.02]
        active:scale-95
                                   shadow-[0_10px_20px_rgba(217,119,87,0.25)]
    "
                                    onClick={() => handleContinue(plan.id)}
                                >
                                    Continue Tomorrow →
                                </button>

                            )}

                        </div>

                    </>

                )
            }

        </section>

    );

}