export default function Display({ data }) {
    return (
        <div className="space-y-8">

            <div>

                <div className="inline-flex rounded-full bg-[#302C27] px-4 py-2 text-xs font-medium tracking-wider text-[#D97757]">
                    CGPA Planner
                </div>

                <h2 className="mt-6 text-4xl font-semibold text-[#ECE7DF]">
                    Semester {data.semester} Target
                </h2>

                <p className="mt-4 max-w-3xl text-lg leading-8 text-[#A79F95]">
                    To achieve your target CGPA of
                    <span className="mx-2 font-semibold text-[#D97757]">
                        {data.target_cgpa}
                    </span>
                    you should aim for an SGPA of
                    <span className="mx-2 font-semibold text-[#D97757]">
                        {Number(data.required_sgpa).toFixed(2)}
                    </span>
                    in Semester {data.semester}.
                </p>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                <div className="rounded-xl border border-[#35312C] bg-[#2B2823] p-6 text-center">

                    <p className="text-sm uppercase tracking-[0.15em] text-[#8A837A]">
                        Current CGPA
                    </p>

                    <h3 className="mt-4 text-2xl font-semibold text-[#ECE7DF]">
                        {Number(data.current_cgpa).toFixed(2)}
                    </h3>

                </div>

                <div className="rounded-xl border border-[#35312C] bg-[#2B2823] p-6 text-center">

                    <p className="text-sm uppercase tracking-[0.15em] text-[#8A837A]">
                        Target CGPA
                    </p>

                    <h3 className="mt-4 text-2xl font-semibold text-[#D97757]">
                        {Number(data.target_cgpa).toFixed(2)}
                    </h3>

                </div>

                <div className="rounded-xl border border-[#35312C] bg-[#2B2823] p-6 text-center">

                    <p className="text-sm uppercase tracking-[0.15em] text-[#8A837A]">
                        Required SGPA
                    </p>

                    <h3 className="mt-4 text-2xl font-semibold text-[#D97757]">
                        {Number(data.required_sgpa).toFixed(2)}
                    </h3>

                </div>

            </div>

            {/* Motivation */}

            <div className="rounded-2xl border border-[#35312C] bg-[#2B2823] px-6 py-5">

                <p className="text-[#A79F95] leading-7">

                    🎯 Keep your semester SGPA around{" "}

                    <span className="font-semibold text-[#D97757]">
                        {Number(data.required_sgpa).toFixed(2)}
                    </span>

                    {" "}or higher to stay on track toward your target CGPA.

                </p>

            </div>

        </div>
    );
}