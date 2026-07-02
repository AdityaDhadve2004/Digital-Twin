export async function createUser(data) {
    const res = await fetch(`http://localhost:3000/api/v1/users/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include"
    })
    const userdata = await res.json();
    return userdata
}

export async function loginUser(data) {
    const res = await fetch(`http://localhost:3000/api/v1/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include"
    })
    const userdata = await res.json();
    return userdata
}

export async function authUser() {
    const res = await fetch(`${BASEURL}/api/v1/auth/me`, {
        method: "GET",
        credentials: "include"
    })
    return res
}
export async function getCurrentUser() {
    const res = await fetch(`http://localhost:3000/api/v1/users/current-user`, {
        method: "GET",
        credentials: "include"
    })
    return res
}
export async function addSubjectToDatabase(data) {
    const res = await fetch(`http://localhost:3000/api/v1/subject/add-subject`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include"
    })
    return await res.json()
}
export async function getAllSemesterSubjectsFromDatabase() {
    const res = await fetch(`http://localhost:3000/api/v1/subject/all-subjects`, {
        method: "GET",
        credentials: "include"
    })
    return await res.json()
}
export async function getAllSemesterSGPAFromDatabase(){
     const res = await fetch(`http://localhost:3000/api/v1/analytics/all-sgpa`, {
        method: "GET",
        credentials: "include"
    })
    return await res.json()
}
export async function deleteSubjectFromDatabase(id){
     const res = await fetch(`http://localhost:3000/api/v1/subject/${id}`, {
        method: "DELETE",
        credentials: "include"
    })
    return await res.json()
}
export async function getIA1Predictions(data) {
    const res = await fetch(`http://localhost:3000/api/v1/predictions/ia1`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include"
    })
    return await res.json();
}
export async function getIA2Predictions(data) {
    const res = await fetch(`http://localhost:3000/api/v1/predictions/ia2`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include"
    })
    return await res.json();
}
export async function getAllIA1Predictions(){
    const res = await fetch(`http://localhost:3000/api/v1/predictions/all-ia1-analysis`,{
        method : "GET",
        credentials : "include"
    })
    return await res.json();
}
export async function getAllIA2Predictions(){
    const res = await fetch(`http://localhost:3000/api/v1/predictions/all-ia2-analysis`,{
        method : "GET",
        credentials : "include"
    })
    return await res.json();
}
export async function getCGPAFromDatabase(){
    const res = await fetch(`http://localhost:3000/api/v1/analytics/cgpa`,{
        method : "GET",
        credentials : "include"
    })
    return await res.json();
}
export async function createDashBoardDataHelper(target){
    const res = await fetch(`http://localhost:3000/api/v1/dashboard/${target}`,{
        method : "POST",
        credentials : "include"
    })
    return await res.json();
}
export async function getDashBoardDataFromDatabase(){
    const res = await fetch(`http://localhost:3000/api/v1/dashboard/dashboard-data`,{
        method : "GET",
        credentials : "include"
    })
    return await res.json();
}
export async function deleteDashboardDataFromDatabase(){
    const res = await fetch(`http://localhost:3000/api/v1/dashboard/delete-dashdata`,{
        method : "DELETE",
        credentials : "include"
    })
    return res;
}
