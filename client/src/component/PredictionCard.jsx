export default function PredictionCard({ prediction }) {

    const badgeColor = {
        IA1: "bg-[#3B2B23] text-[#E38A63]",
        IA2: "bg-[#2E3428] text-[#8FD19E]",
    };

    return (

        <div
            className="
        group
        rounded-3xl
        border
        border-[#35312C]
        bg-[#2A2622]
        p-6
        cursor-pointer
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#D97757]/40
        hover:bg-[#302C27]
        shadow-[0_8px_20px_rgba(0,0,0,.12)]
        "
        >

            {/* Top */}

            <div className="flex justify-between items-start">

                <div className="space-y-1">

                    <h3 className="text-xl font-semibold text-[#ECE7DF]">
                        {prediction.subject_name}
                    </h3>

                    <p className="text-sm text-[#9E978E] tracking-wide">
                        {prediction.code}
                    </p>

                </div>

                <span
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold ${badgeColor[prediction.analysis_type]}`}
                >
                    {prediction.analysis_type}
                </span>

            </div>

            {/* Subject Details */}

            <div className="mt-5 flex flex-wrap gap-2">

                <span className="rounded-full bg-[#34302B] px-3 py-1 text-xs text-[#B7AFA6]">
                    Semester {prediction.semester}
                </span>

                <span className="rounded-full bg-[#34302B] px-3 py-1 text-xs text-[#B7AFA6]">
                    Grade {prediction.grade}
                </span>

            </div>

            {/* Divider */}

            <div className="my-5 h-px bg-[#35312C]" />

            {/* AI Analysis */}

            <div>

                <p className="text-xs uppercase tracking-[0.2em] text-[#8A837A] mb-3">
                    AI Insight
                </p>

                <p className="text-[15px] leading-7 text-[#D5CEC5] line-clamp-4">
                    {prediction.gemini_analysis}
                </p>

            </div>

        </div>

    );
}