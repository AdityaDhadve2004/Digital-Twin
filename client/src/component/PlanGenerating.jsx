export default function PlanGenerating() {

    const steps = [
        "Reading your uploaded syllabus",
        "Identifying prerequisite concepts",
        "Finding high-weightage topics",
        "Selecting important formulas",
        "Organizing numerical practice",
        "Preparing revision strategy"
    ];

    return (

        <div className="min-h-[80vh] flex items-center justify-center">

            <div
                className="
                    w-full
                    max-w-3xl
                    rounded-3xl
                    border
                    border-[#35312C]
                    bg-[#24211D]
                    p-12
                    shadow-[0_20px_45px_rgba(0,0,0,.35)]
                "
            >

                {/* Brain */}

                <div className="flex justify-center">

                    <div
                        className="
                            h-24
                            w-24
                            rounded-full
                            bg-[#D97757]/15
                            flex
                            items-center
                            justify-center
                            text-5xl
                            animate-pulse
                        "
                    >
                        🧠
                    </div>

                </div>

                {/* Heading */}

                <div className="mt-8 text-center">

                    <h1 className="text-4xl font-bold text-[#ECE7DF]">

                        Your Digital Twin is Thinking...

                    </h1>

                    <p className="mt-5 text-lg leading-8 text-[#A79F95]">

                        An experienced engineering professor is analyzing your
                        study goal and preparing a personalized study guide.

                    </p>

                </div>

                {/* Steps */}

                <div className="mt-12 space-y-4">

                    {steps.map((step) => (

                        <div
                            key={step}
                            className="
                                flex
                                items-center
                                gap-4
                                rounded-2xl
                                border
                                border-[#35312C]
                                bg-[#2B2823]
                                px-5
                                py-4
                            "
                        >

                            <div
                                className="
                                    h-5
                                    w-5
                                    rounded-full
                                    border-[3px]
                                    border-[#D97757]
                                    border-t-transparent
                                    animate-spin
                                "
                            />

                            <p className="text-[#ECE7DF]">

                                {step}

                            </p>

                        </div>

                    ))}

                </div>

                {/* Footer */}

                <p
                    className="
                        mt-10
                        text-center
                        text-sm
                        text-[#8A837A]
                    "
                >

                    This usually takes only a few seconds.

                </p>

            </div>

        </div>

    );

}