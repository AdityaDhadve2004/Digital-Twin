import { useActionData, useLoaderData,useNavigation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllPlansFromDatabase } from "../api"
import AddNewPlanForm from "../form/AddNewPlanForm"
import PlanList from "../component/PlanList";
import PlanDetails from "../planner/PlanDetails";
import { AnimatePresence, motion } from "framer-motion";
import PlanGenerating from "../component/PlanGenerating";



export async function loader() {
    const allPlans = await getAllPlansFromDatabase();
    return allPlans;
}

export default function PlanPage() {
    const navigation = useNavigation();
    const data = useLoaderData();
    const actionData = useActionData();
    const [isSelectedPlan, setSelectedPlan] = useState(null);
    useEffect(() => {

        if (actionData) {

            setSelectedPlan(actionData.data);

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }

    }, [actionData]);

    if (navigation.state === "submitting") {

        return <PlanGenerating />;

    }
    
    function getSelectedPlan(plan) {
        setSelectedPlan(plan)
    }
    return (
        <>
            <div className="max-w-[1700px] mx-auto">
                <div className="grid grid-cols-[2fr_1fr] gap-10 items-start">
                    <AnimatePresence mode="wait">
                        {isSelectedPlan ? (
                            <motion.div
                                key="details"
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: .35 }}
                            >

                                <PlanDetails plan={isSelectedPlan} />

                            </motion.div>

                        ) : (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: .25 }}
                            >

                                <AddNewPlanForm />

                            </motion.div>


                        )}
                    </AnimatePresence>
                    <div className="sticky top-6">
                        <PlanList event={getSelectedPlan} plans={data.data} />
                    </div>

                </div>
            </div>

        </>
    )
}