import { useState,useEffect,useRef } from "react";
import { useNavigation } from "react-router-dom";
export default function AnalysisModal(
    prop) {
    console.log(prop)
    const [open, setOpen] = useState(false);
    const contentRef = useRef(null);
    const [height, setHeight] = useState("0px");

    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    useEffect(() => {
        if (!contentRef.current) return;

        if (open) {
            setHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setHeight("0px");
        }
    }, [open]);

    return (
        <div className="mb-6 rounded-2xl overflow-hidden border border-orange-500/30 bg-[#111] shadow-lg">

            {/* Header */}

            <button
                onClick={() => setOpen(!open)}
                className="w-full px-6 py-5 flex items-center justify-between bg-gradient-to-r from-black/80 to-[#1b1b1b] hover:from-orange-900/30 hover:to-black transition-all duration-300"
            >
                <div>
                    <h2 className="text-xl font-bold text-white">
                        {prop.allData.data}
                    </h2>

                    <p className="text-sm text-neutral-400 mt-1">
                        Predict your Internal Assessment marks
                    </p>
                </div>

                <div
                    className={`text-orange-500 transition-transform duration-300 ${open ? "rotate-180" : ""
                        }`}
                >
                    <svg
                        width="28"
                        height="28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </div>
            </button>

            {/* Content */}

            <div
                style={{
                    height,
                    transition: "height 350ms ease",
                    overflow: "hidden",
                }}
            ><div className="mt-6 rounded-2xl border border-orange-500/30 bg-[#111] shadow-xl overflow-hidden animate-fadeIn">

                    {/* Header */}
                    <div className="px-6 py-4 border-b border-orange-500/20 bg-gradient-to-r from-orange-600/20 to-black">
                        <h3 className="text-xl font-bold text-orange-400">
                            🤖 AI Performance Analysis
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">
                            Generated using Gemini AI
                        </p>
                    </div>

                    {/* Analysis */}
                    <div className="p-6">
                        <textarea
                            readOnly
                            value={prop.allData.data.text}
                            rows={14}
                            className="
                        w-full
                        bg-neutral-900
                        border
                        border-neutral-700
                        rounded-xl
                        p-5
                        text-gray-200
                        leading-7
                        resize-none
                        focus:outline-none
                    "
                        />
                    </div>
                </div>

            </div>
            {

            }

        </div>
    )
};
