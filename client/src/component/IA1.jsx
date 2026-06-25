import { useState, useRef, useEffect } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { getIA1Predictions,getAllIA1Predictions } from "../api";
import { useLoaderData } from "react-router-dom";

export async function loader(){
    const allIA1Analysis = await getAllIA1Predictions();
    return allIA1Analysis
}

export async function actionIA1Prediction({ request }) {
    const formData = await request.formData();
    const jsonData = Object.fromEntries(formData);
    const predictions = await getIA1Predictions(jsonData)
    return predictions   
}
export default function IA1({
    title,
    action = "POST",
}) {
    const data = useActionData();
    const ia1 = useLoaderData();
    console.log(ia1);
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
                        {title}
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
            >
                <div ref={contentRef} className="p-6">

                    <Form method={action}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">


                            <div className="flex flex-col">
                                <label className="text-sm text-gray-300 mb-2">
                                    Semester
                                </label>

                                <select
                                    name="semester"
                                    className="px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-orange-500"
                                >
                                    <option value="">Semester</option>

                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                                        <option
                                            key={sem}
                                            value={sem}
                                        >
                                            Semester {sem}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm text-gray-300 mb-2">
                                    Isa_Total
                                </label>

                                <input
                                    type="number"
                                    name="isa_total"
                                    placeholder="15 or 20"
                                    className="px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-orange-500"
                                />
                            </div>



                            <div className="flex flex-col">
                                <label className="text-sm text-gray-300 mb-2">
                                    Mse1_Marks
                                </label>

                                <input
                                    type="number"
                                    name="mse_marks"
                                    placeholder="15 or 20"
                                    className="px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-orange-500"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm text-gray-300 mb-2">
                                    Mse_Total
                                </label>

                                <input
                                    type="number"
                                    name="mse_total"
                                    placeholder="20"
                                    className="px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-orange-500"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm text-gray-300 mb-2">
                                    Ese_Total
                                </label>

                                <input
                                    type="number"
                                    name="ese_total"
                                    placeholder="50 or 60"
                                    className="px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-orange-500"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm text-gray-300 mb-2">
                                    Lab_Total
                                </label>

                                <input
                                    type="number"
                                    name="lab_total"
                                    placeholder="50"
                                    className="px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-orange-500"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-700 mb-2">Grade (Optional)</label>
                                <select
                                    name="grade"
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                                >
                                    <option value="">Select Grade</option>
                                    <option value="O">O (10)</option>
                                    <option value="A">A (9)</option>
                                    <option value="B">B (8)</option>
                                    <option value="C">C (7)</option>
                                    <option value="D">D (6)</option>
                                    <option value="E">E (5)</option>
                                    <option value="P">P (4)</option>
                                    <option value="F">F (0)</option>
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-700 mb-2">Subject Code *</label>
                                <input
                                    type="text"
                                    name="code"
                                    placeholder="e.g., CS201"
                                    required
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm text-gray-300 mb-2">
                                    Total_Marks
                                </label>

                                <input
                                    type="number"
                                    name="total_marks"
                                    placeholder="15 or 20"
                                    className="px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-orange-500"
                                />
                            </div>

                        </div>

                        <div className="mt-6 flex justify-end">

                            <button
                                disabled={isSubmitting}
                                className="px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold transition-all hover:scale-105 active:scale-95"
                            >
                                {isSubmitting
                                    ? "Predicting..."
                                    : "Predict IA Marks"}
                            </button>

                        </div>

                    </Form>

                </div>
            </div>
                                    
            {
    data?.data?.text && (
        <div className="mt-6 rounded-2xl border border-orange-500/30 bg-[#111] shadow-xl overflow-hidden animate-fadeIn">
            
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
                    value={data.data.text}
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
    )
}

        </div>
          )
};
