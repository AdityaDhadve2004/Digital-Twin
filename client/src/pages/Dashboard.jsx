import { useLoaderData, Form, useRevalidator } from "react-router-dom";
import { createDashBoardDataHelper, getCurrentUser, getDashBoardDataFromDatabase } from "../api"
import UserInfo from "../component/UserInfo";
import AddSubjectForm from "../form/AddSubjectForm";
import { useRef } from "react";
import Display from "../component/Display";
import { getAllSemesterSGPAFromDatabase } from "../api";
import { Success } from "../component/Success";
import { Fail } from "../component/Fail";
import { checkPointer } from "../utils/checkPointer";

export async function loader() {
    const dashboardData = await getDashBoardDataFromDatabase();
    const sgpaData = await getAllSemesterSGPAFromDatabase();
    return { dashboardData, sgpaData }
}


export default function Dashboard() {
    const { revalidate } = useRevalidator();
    const { dashboardData, sgpaData } = useLoaderData();
    console.log(dashboardData.data);
    console.log(sgpaData.data);
    let response;
    let answer;
    if (dashboardData.data) {
        answer = sgpaData.data.some((object) => {
            return object.sem == dashboardData.data.semester
        })
        if (answer) {
            response = checkPointer(sgpaData.data, dashboardData.data)
        }
    }
    
   
    async function handleTarget() {
        const res = await createDashBoardDataHelper(contentRef.current.value)
        if (res.success) {
            revalidate()
        }
    }
    const contentRef = useRef(null);


    return (
        <div className="space-y-8">

            {/* Greeting Section */}
            <div className="space-y-2">
                <p className="text-[#A79F95] text-lg">
                    Good Evening,
                </p>

                <h1 className="text-5xl font-semibold tracking-tight text-[#ECE7DF]">
                    Aditya
                </h1>

                <p className="text-[#A79F95] text-lg">
                    Academic Digital Twin

                    Track • Predict • Improve
                </p>
            </div>


            <div className="space-y-8">
                <div className="rounded-xl border border-[#35312C] bg-[#24211D] p-8 shadow-[0_10px_30px_rgba(0,0,0,.18)]">

                    {
                        dashboardData.data ? (
                            answer ? (
                                response.success == true ? <Success data1={dashboardData.data} data2={response} /> : <Fail data1={dashboardData.data} data2={response} />
                            ) : <Display data={dashboardData.data} />
                        )
                            :
                            (
                                <>
                                    <div className="md:col-span-2 flex flex-col">

                                        <label className="mb-2 text-sm font-medium text-[#B5ADA4]">
                                            Target CGPA
                                        </label>

                                        <input
                                            ref={contentRef}
                                            type="number"
                                            placeholder="eg:8"
                                            required
                                            className="rounded-xl border border-[#35312C] bg-[#2B2823] px-5 py-4 text-[#ECE7DF] placeholder:text-[#7F786F] outline-none transition-all duration-200 focus:border-[#D97757]"
                                        />

                                    </div>


                                    <button
                                        type="button"
                                        onClick={handleTarget}
                                        className="mt-10 rounded-xl bg-[#D97757] px-8 py-4 font-semibold text-white transition-all duration-200 hover:bg-[#C86645] hover:scale-[1.02] active:scale-95"
                                    >
                                        Target CGPA
                                    </button>
                                </>


                            )
                    }


                </div>

            </div>

            {/* Main Content */}
            <div className="space-y-8">
                <div className="rounded-xl border border-[#35312C] bg-[#24211D] p-8 shadow-[0_10px_30px_rgba(0,0,0,.18)]">

                    <AddSubjectForm />

                </div>

            </div>

        </div>
    );
}