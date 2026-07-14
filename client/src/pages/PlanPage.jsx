import { useActionData, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllPlansFromDatabase } from "../api"
import AddNewPlanForm from "../form/AddNewPlanForm"
import PlanList from "../component/PlanList";
import PlanDetails from "../planner/PlanDetails";

export async function loader() {
    const allPlans = await getAllPlansFromDatabase();
    return allPlans;
}

export default function PlanPage() {
    const data = useLoaderData();
    const actionData = useActionData();
    const [isSelectedPlan, setSelectedPlan] = useState(null);
    useEffect(() => {

        if (actionData) {

            setSelectedPlan(actionData.data);

        }

    }, [actionData]);
    function getSelectedPlan(plan) {
        setSelectedPlan(plan)
    }
    return (
        <>
            <div className="max-w-[1700px] mx-auto">
                <div className="grid grid-cols-[2fr_1fr] gap-10 items-start">

                    {isSelectedPlan ? (
                        <div>
                            <PlanDetails plan={isSelectedPlan} />
                        </div>
                    ) : (
                        <div>
                            <AddNewPlanForm />
                        </div>

                    )}
                    <div className="sticky top-6">
                        <PlanList event={ getSelectedPlan } plans={data.data} />
                    </div>

                </div>
            </div>

        </>
    )
}