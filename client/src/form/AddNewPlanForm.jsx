import { Form, useActionData } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAiPlanFromDatabase } from "../api";
export async function actionPlan({ request }) {
    const formData = await request.formData();
    const data = new FormData()
    data.append("title", formData.get("title"))
    data.append("description", formData.get("description"))
    data.append("hours", formData.get("hours"))
    data.append("date", formData.get("date"))
    data.append("duration", formData.get("duration"))
    data.append("category", formData.get("category"))
    data.append("priority", formData.get("priority"))
    data.append("code", formData.get("code"))
    data.append("referenceImage", formData.get("referenceImage"))
    console.log(formData);
    const response = await getAiPlanFromDatabase(formData);
    return response

}

export default function AddNewPlanForm() {
    const data = useActionData();
    console.log(data);
    return (
        (
            <div className="max-w-5xl mx-auto rounded-3xl border border-[#35312C] bg-[#24211D] shadow-[0_10px_30px_rgba(0,0,0,.18)] p-8">

                <div className="mb-8">

                    <h2 className="text-3xl font-semibold text-[#ECE7DF]">
                        Add New Plan
                    </h2>


                </div>

                <Form method="POST">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                        <div className="md:col-span-2 flex flex-col">

                            <label className="mb-2 text-sm font-medium text-[#B5ADA4]">
                                Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                placeholder="eg : DBMS Mod 3"
                                required
                                className="rounded-2xl border border-[#35312C] bg-[#2B2823] px-5 py-4 text-[#ECE7DF] placeholder:text-[#7F786F] outline-none transition-all duration-200 focus:border-[#D97757]"
                            />

                        </div>





                        <div className="flex flex-col">

                            <label className="mb-2 text-sm font-medium text-[#B5ADA4]">
                                Plan Desription
                            </label>

                            <input
                                type="text"
                                name="description"
                                placeholder="My Plan is to cover CN mod 2 in 5 days which contains total of 4 topics"
                                required
                                className="rounded-2xl border border-[#35312C] bg-[#2B2823] px-5 py-4 text-[#ECE7DF] placeholder:text-[#7F786F] outline-none transition-all duration-200 focus:border-[#D97757]"
                            />

                        </div>


                        <div className="flex flex-col">

                            <label className="mb-2 text-sm font-medium text-[#B5ADA4]">
                                Hours_Per_Day

                            </label>

                            <input
                                type="number"
                                name="hours"
                                placeholder="eg : 4 hours"
                                required
                                className="rounded-2xl border border-[#35312C] bg-[#2B2823] px-5 py-4 text-[#ECE7DF] placeholder:text-[#7F786F] outline-none transition-all duration-200 focus:border-[#D97757]"
                            />

                        </div>

                        <div className="flex flex-col">

                            <label className="mb-2 text-sm font-medium text-[#B5ADA4]">
                                Start Date
                            </label>

                            <input
                                type="date"
                                name="date"
                                required
                                className="rounded-2xl border border-[#35312C] bg-[#2B2823] px-5 py-4 text-[#ECE7DF] placeholder:text-[#7F786F] outline-none transition-all duration-200 focus:border-[#D97757]"
                            />

                        </div>

                        <div className="flex flex-col">

                            <label className="mb-2 text-sm font-medium text-[#B5ADA4]">
                                No.of Days
                            </label>

                            <input
                                type="number"
                                name="duration"
                                placeholder="eg : 4 Days"
                                required
                                className="rounded-2xl border border-[#35312C] bg-[#2B2823] px-5 py-4 text-[#ECE7DF] placeholder:text-[#7F786F] outline-none transition-all duration-200 focus:border-[#D97757]"
                            />

                        </div>


                        <select
                            name="category"
                            required
                            className="rounded-2xl border border-[#35312C] bg-[#2B2823] px-5 py-4 mt-5 text-[#ECE7DF] outline-none transition-all duration-200 focus:border-[#D97757]"
                        >
                            <option value="">Select Category</option>

                            {["PERSONAL", "PLACEMENT", "ACADEMIC"].map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}

                        </select>



                        <select
                            name="priority"
                            required
                            className="rounded-2xl border border-[#35312C] bg-[#2B2823] px-5 py-4 mt-5 text-[#ECE7DF] outline-none transition-all duration-200 focus:border-[#D97757]"
                        >
                            <option value="">Select Priority</option>

                            {["LOW", "MEDIUM", "HIGH"].map((priority) => (
                                <option key={priority} value={priority}>
                                    {priority}
                                </option>
                            ))}

                        </select>



                        <div className="flex flex-col">

                            <label className="mb-2 text-sm font-medium text-[#B5ADA4]">
                                Subject Code
                            </label>

                            <input
                                type="text"
                                name="code"
                                className="rounded-2xl border border-[#35312C] bg-[#2B2823] px-5 py-4 text-[#ECE7DF] placeholder:text-[#7F786F] outline-none transition-all duration-200 focus:border-[#D97757]"
                            />

                        </div>

                        <div className="flex flex-col">

                            <label className="mb-2 text-sm font-medium text-[#B5ADA4]">
                                Upload Image
                            </label>

                            <input
                                type="file"
                                name="referenceImage"
                                accept="image/*"
                                className="rounded-2xl border border-[#35312C] bg-[#2B2823] px-5 py-4 text-[#ECE7DF] placeholder:text-[#7F786F] outline-none transition-all duration-200 focus:border-[#D97757]"
                            />

                        </div>

                    </div>

                    <div className="mt-8 flex justify-end">

                        <button
                            type="submit"
                            className="rounded-2xl bg-[#D97757] px-8 py-4 font-semibold text-white transition-all duration-200 hover:bg-[#C86645] hover:scale-[1.02] active:scale-95"
                        >
                            CREATE PLAN
                        </button>

                    </div>

                </Form>
            </div>
        )
    );
}