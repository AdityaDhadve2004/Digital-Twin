import { Form, useActionData } from 'react-router-dom';
import { addSubjectToDatabase } from '../api';
import { useRef, useEffect, useState } from "react";


export async function actionSubject({ request }) {
    const formData = await request.formData();
    const jsonData = Object.fromEntries(formData);
    const response = await addSubjectToDatabase(jsonData);
    return response
}
export default function AddSubjectForm() {
    const [showMessage, setShowMessage] = useState(false);
    const data = useActionData();
    const formRef = useRef(null);
    useEffect(() => {
        if (data?.success) {
            formRef.current?.reset();
        }
    }, [data]);
    useEffect(() => {
        if (data) {
            setShowMessage(true);

            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [data]);

    return (
    <div className="max-w-5xl mx-auto rounded-3xl border border-[#35312C] bg-[#24211D] shadow-[0_10px_30px_rgba(0,0,0,.18)] p-8">

        <div className="mb-8">

            <h2 className="text-3xl font-semibold text-[#ECE7DF]">
                Add New Subject
            </h2>

            <p className="mt-2 text-[#A79F95]">
                Add a subject so your Digital Twin can predict your academic performance.
            </p>

        </div>

        <Form method="POST" ref={formRef}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Subject Name */}

                <div className="md:col-span-2 flex flex-col">

                    <label className="mb-2 text-sm font-medium text-[#B5ADA4]">
                        Subject Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Data Structures"
                        required
                        className="rounded-2xl border border-[#35312C] bg-[#2B2823] px-5 py-4 text-[#ECE7DF] placeholder:text-[#7F786F] outline-none transition-all duration-200 focus:border-[#D97757]"
                    />

                </div>

                {/* Subject Code */}

                <div className="flex flex-col">

                    <label className="mb-2 text-sm font-medium text-[#B5ADA4]">
                        Subject Code
                    </label>

                    <input
                        type="text"
                        name="code"
                        placeholder="CS201"
                        required
                        className="rounded-2xl border border-[#35312C] bg-[#2B2823] px-5 py-4 text-[#ECE7DF] placeholder:text-[#7F786F] outline-none transition-all duration-200 focus:border-[#D97757]"
                    />

                </div>

                {/* Credits */}

                <div className="flex flex-col">

                    <label className="mb-2 text-sm font-medium text-[#B5ADA4]">
                        Credits
                    </label>

                    <input
                        type="number"
                        name="credits"
                        min="1"
                        max="8"
                        placeholder="4"
                        required
                        className="rounded-2xl border border-[#35312C] bg-[#2B2823] px-5 py-4 text-[#ECE7DF] placeholder:text-[#7F786F] outline-none transition-all duration-200 focus:border-[#D97757]"
                    />

                </div>

                {/* Semester */}

                <div className="flex flex-col">

                    <label className="mb-2 text-sm font-medium text-[#B5ADA4]">
                        Semester
                    </label>

                    <select
                        name="semester"
                        required
                        className="rounded-2xl border border-[#35312C] bg-[#2B2823] px-5 py-4 text-[#ECE7DF] outline-none transition-all duration-200 focus:border-[#D97757]"
                    >
                        <option value="">Select Semester</option>

                        {[1,2,3,4,5,6,7,8].map((sem)=>(
                            <option key={sem} value={sem}>
                                Semester {sem}
                            </option>
                        ))}

                    </select>

                </div>

                {/* Grade */}

                <div className="flex flex-col">

                    <label className="mb-2 text-sm font-medium text-[#B5ADA4]">
                        Previous Grade
                    </label>

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

            </div>

            <div className="mt-8 flex justify-end">

                <button
                    type="submit"
                    className="rounded-2xl bg-[#D97757] px-8 py-4 font-semibold text-white transition-all duration-200 hover:bg-[#C86645] hover:scale-[1.02] active:scale-95"
                >
                    Add Subject
                </button>

            </div>

        </Form>

        {showMessage && (

            <div className="mt-8 rounded-2xl border border-[#335D45] bg-[#213528] px-5 py-4 text-[#9AD6AE]">

                ✓ Subject added successfully.

            </div>

        )}

    </div>
);
}