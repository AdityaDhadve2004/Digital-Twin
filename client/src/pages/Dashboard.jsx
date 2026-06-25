import { useLoaderData } from "react-router-dom";
import { getCurrentUser } from "../api"
import UserInfo from "../component/UserInfo";
import AddSubjectForm from "../form/AddSubjectForm";

export async function loader() {
    const res = await getCurrentUser();
    return res.json();
}

export default function Dashboard(){
    const data = useLoaderData();
    console.log(data);

    return(
        <>
        <div>
           <UserInfo user={data} />
           <AddSubjectForm/>
        </div>

        </>
    )

}