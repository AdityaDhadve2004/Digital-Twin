import { useRevalidator } from "react-router-dom";
import { deleteDashboardDataFromDatabase } from "../api";

export function Success({ data1, data2 }) {
    const {revalidate} = useRevalidator();
    console.log(data2.data);
    console.log(data1)
    async function handleDelete() {
        const response = await deleteDashboardDataFromDatabase();
        if (response.ok) {
            revalidate()
        }
    }
    return (
        <div className="space-y-8">

            <div>

                <div className="inline-flex rounded-full bg-[#302C27] px-4 py-2 text-xs font-medium tracking-wider text-[#D97757]">
                    CGPA Planner
                </div>

                <h2 className="mt-6 text-4xl font-semibold text-[#ECE7DF]">
                    🎉 Semester {data1.semester} Goal Achieved
                </h2>

                <p className="mt-4 max-w-3xl text-lg leading-8 text-[#A79F95]">
                    Excellent work! You successfully achieved the SGPA required
                    to stay on track for your target CGPA.
                </p>

            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                <div className="rounded-2xl border border-[#35312C] bg-[#2B2823] p-6 text-center">

                    <p className="text-sm uppercase tracking-[0.15em] text-[#8A837A]">
                        Required SGPA
                    </p>

                    <h3 className="mt-4 text-5xl font-semibold text-[#D97757]">
                        {Number(data1.required_sgpa).toFixed(2)}
                    </h3>

                </div>

                <div className="rounded-2xl border border-[#35312C] bg-[#2B2823] p-6 text-center">

                    <p className="text-sm uppercase tracking-[0.15em] text-[#8A837A]">
                        Your SGPA
                    </p>

                    <h3 className="mt-4 text-5xl font-semibold text-[#ECE7DF]">
                        {Number(data2.data.pointer).toFixed(2)}
                    </h3>

                </div>

                <div className="rounded-2xl border border-[#35312C] bg-[#2B2823] p-6 text-center">

                    <p className="text-sm uppercase tracking-[0.15em] text-[#8A837A]">
                        Difference
                    </p>

                    <h3 className="mt-4 text-5xl font-semibold text-green-400">
                        +{(data2.data.pointer - data1.required_sgpa).toFixed(2)}
                    </h3>

                </div>

            </div>

            <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-6 py-5">

                <p className="text-lg text-[#D8D4CD]">
                    Keep this momentum going. Your Digital Twin recommends
                    maintaining similar performance in the coming semesters to
                    comfortably reach your final CGPA target.
                </p>

            </div>

            <button onClick={handleDelete}
                className="rounded-2xl bg-[#D97757] px-8 py-4 font-medium text-white transition-all duration-200 hover:bg-[#C86645] hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
                Set Next Semester Goal
            </button>

        </div>
    );
}