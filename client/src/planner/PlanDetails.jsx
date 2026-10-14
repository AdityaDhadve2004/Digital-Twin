import TodayFocus from "./TodayFocus";
import Timeline from "./Timeline";
import BottomAction from "./BottomAction";
export default function PlanDetails({ plan }) {

    return (

        <div className="space-y-8">

            <TodayFocus plan={plan} />

            <Timeline plan={plan} />

            <BottomAction plan={plan} />

        </div>

    );

}