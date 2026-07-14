import { useState, useRef, useEffect } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { getIA1Predictions, getAllIA1Predictions } from "../api";
import { useLoaderData } from "react-router-dom";
import PredictionRecents from "./PredictionRecents";

export async function loader() {
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
    const [isFormDisable, setIsFormDisable] = useState(true);
    const [open, setOpen] = useState(false);
    const contentRef = useRef(null);
    const [height, setHeight] = useState("0px");

    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    useEffect(() => {
        setIsFormDisable(!isFormDisable)
    }, [data])

    useEffect(() => {
        if (!contentRef.current) return;

        if (open) {
            setHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setHeight("0px");
        }
    }, [open]);

    return (
        <div className="grid grid-cols-12 gap-8 items-start">

            {/* LEFT SIDE */}
            <div className="col-span-8">

                <div className="rounded-3xl border border-[#35312C] bg-[#24211D] shadow-[0_10px_30px_rgba(0,0,0,.18)] overflow-hidden">
                    {isFormDisable ? null : (
                        <div>
                            <button
                                onClick={() => setOpen(!open)}
                                className="w-full flex items-center justify-between px-8 py-6 border-b border-[#35312C] transition hover:bg-[#2B2823]"
                            >
                                <div>
                                    <div className="inline-flex rounded-full bg-[#302C27] px-4 py-2 text-xs font-medium tracking-wider text-[#D97757]">

                                        AI Prediction

                                    </div>

                                    <p className="mt-3 text-[#A79F95]">

                                        Predict your Internal Assessment marks using your academic performance.

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

                            <div
                                style={{
                                    height,
                                    transition: "height 350ms ease",
                                    overflow: "hidden",
                                }}
                            >
                                <div ref={contentRef} className="p-8">

                                    <Form method={action}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">


                                            <div className="flex flex-col">
                                                <label className="mb-2 text-sm font-medium text-[#B5ADA4]">
                                                    Semester
                                                </label>

                                                <select
                                                    name="semester"
                                                    className="rounded-2xl border border-[#35312C] bg-[#2B2823] px-5 py-4 text-[#ECE7DF] outline-none transition-all duration-200 focus:border-[#D97757]"
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
                                                <label className="mb-2 text-sm font-medium text-[#B5ADA4]">
                                                    Isa_Total
                                                </label>

                                                <input
                                                    type="number"
                                                    name="isa_total"
                                                    placeholder="15 or 20"
                                                    className="rounded-2xl border border-[#35312C] bg-[#2B2823] px-5 py-4 text-[#ECE7DF] placeholder:text-[#7F786F] outline-none transition-all duration-200 focus:border-[#D97757]"
                                                />
                                            </div>



                                            <div className="flex flex-col">
                                                <label className="mb-2 text-sm font-medium text-[#B5ADA4]">
                                                    Mse1_Marks
                                                </label>

                                                <input
                                                    type="number"
                                                    name="mse_marks"
                                                    placeholder="15 or 20"
                                                    className="rounded-2xl border border-[#35312C] bg-[#2B2823] px-5 py-4 text-[#ECE7DF] placeholder:text-[#7F786F] outline-none transition-all duration-200 focus:border-[#D97757]"
                                                />
                                            </div>

                                            <div className="flex flex-col">
                                                <label className="mb-2 text-sm font-medium text-[#B5ADA4]">
                                                    Mse_Total
                                                </label>

                                                <input
                                                    type="number"
                                                    name="mse_total"
                                                    placeholder="20"
                                                    className="rounded-2xl border border-[#35312C] bg-[#2B2823] px-5 py-4 text-[#ECE7DF] placeholder:text-[#7F786F] outline-none transition-all duration-200 focus:border-[#D97757]"
                                                />
                                            </div>

                                            <div className="flex flex-col">
                                                <label className="mb-2 text-sm font-medium text-[#B5ADA4]">
                                                    Ese_Total
                                                </label>

                                                <input
                                                    type="number"
                                                    name="ese_total"
                                                    placeholder="50 or 60"
                                                    className="rounded-2xl border border-[#35312C] bg-[#2B2823] px-5 py-4 text-[#ECE7DF] placeholder:text-[#7F786F] outline-none transition-all duration-200 focus:border-[#D97757]"
                                                />
                                            </div>

                                            <div className="flex flex-col">
                                                <label className="mb-2 text-sm font-medium text-[#B5ADA4]">
                                                    Lab_Total
                                                </label>

                                                <input
                                                    type="number"
                                                    name="lab_total"
                                                    placeholder="50"
                                                    className="rounded-2xl border border-[#35312C] bg-[#2B2823] px-5 py-4 text-[#ECE7DF] placeholder:text-[#7F786F] outline-none transition-all duration-200 focus:border-[#D97757]"
                                                />
                                            </div>

                                            <div className="flex flex-col">
                                                <label className="mb-2 text-sm font-medium text-[#B5ADA4]">Grade (Optional)</label>
                                                <select
                                                    name="grade"
                                                    className="rounded-2xl border border-[#35312C] bg-[#2B2823] px-5 py-4 text-[#ECE7DF] outline-none transition-all duration-200 focus:border-[#D97757]"
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
                                                <label className="mb-2 text-sm font-medium text-[#B5ADA4]">Subject Code *</label>
                                                <input
                                                    type="text"
                                                    name="code"
                                                    placeholder="e.g., CS201"
                                                    required
                                                    className="rounded-2xl border border-[#35312C] bg-[#2B2823] px-5 py-4 text-[#ECE7DF] placeholder:text-[#7F786F] outline-none transition-all duration-200 focus:border-[#D97757]"
                                                />
                                            </div>

                                            <div className="flex flex-col">
                                                <label className="mb-2 text-sm font-medium text-[#B5ADA4]">
                                                    Total_Marks
                                                </label>

                                                <input
                                                    type="number"
                                                    name="total_marks"
                                                    placeholder="15 or 20"
                                                    className="rounded-2xl border border-[#35312C] bg-[#2B2823] px-5 py-4 text-[#ECE7DF] placeholder:text-[#7F786F] outline-none transition-all duration-200 focus:border-[#D97757]"
                                                />
                                            </div>

                                        </div>

                                        <div className="mt-6 flex justify-end">

                                            <button
                                                disabled={isSubmitting}
                                                className="rounded-2xl bg-[#D97757] px-8 py-4 font-medium text-white transition-all duration-200 hover:bg-[#C86645] hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                                            >
                                                {isSubmitting
                                                    ? "Predicting..."
                                                    : "Predict IA Marks"}
                                            </button>

                                        </div>

                                    </Form>

                                </div>


                            </div>
                        </div>
                    )}

                    {/* AI Analysis */}
                    {data?.data?.text && (
                        <div className="mt-8 rounded-3xl border border-[#35312C] bg-[#24211D] shadow-[0_10px_30px_rgba(0,0,0,.18)] overflow-hidden">

                            <div className="border-b border-[#35312C] px-8 py-6">

                                <div className="inline-flex rounded-full bg-[#302C27] px-4 py-2 text-xs font-medium tracking-wider text-[#D97757]">

                                    AI Generated Report

                                </div>

                                <h3 className="mt-5 text-3xl font-semibold text-[#ECE7DF]">

                                    Performance Analysis

                                </h3>

                                <p className="mt-3 text-[#A79F95]">

                                    Generated using GROQ based on your academic performance.

                                </p>

                            </div>

                            <div className="p-8">

                                {/* Summary Cards */}

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

                                    <div className="rounded-2xl border border-[#35312C] bg-[#2B2823] p-5">

                                        <p className="text-xs uppercase tracking-[0.2em] text-[#8A837A]">

                                            Status

                                        </p>

                                        <h4 className="mt-3 text-xl font-semibold text-[#ECE7DF]">

                                            Prediction Complete

                                        </h4>

                                    </div>

                                    <div className="rounded-2xl border border-[#35312C] bg-[#2B2823] p-5">

                                        <p className="text-xs uppercase tracking-[0.2em] text-[#8A837A]">

                                            Model

                                        </p>

                                        <h4 className="mt-3 text-xl font-semibold text-[#ECE7DF]">

                                            GROQ AI

                                        </h4>

                                    </div>

                                    <div className="rounded-2xl border border-[#35312C] bg-[#2B2823] p-5">

                                        <p className="text-xs uppercase tracking-[0.2em] text-[#8A837A]">

                                            Analysis

                                        </p>

                                        <h4 className="mt-3 text-xl font-semibold text-[#D97757]">

                                            Ready

                                        </h4>

                                    </div>

                                </div>

                                {/* AI Response */}

                                <div className="rounded-2xl border border-[#35312C] bg-[#2B2823] p-7">

                                    <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#8A837A]">

                                        Detailed AI Analysis

                                    </p>

                                    <div className="whitespace-pre-wrap leading-8 text-[15px] text-[#D5CEC5]">

                                        {data.data.text}

                                    </div>

                                </div>

                            </div>



                        </div>
                    )}

                </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="col-span-4">

                <div className="sticky top-6">

                    <PredictionRecents
                        predictions={ia1.data}
                    />

                </div>

            </div>

        </div>
    );

    /* ===================== END ===================== */

};
