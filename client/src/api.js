export async function createUser(data) {
    const res = await fetch(`http://localhost:3000/api/v1/users/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: include
    })
    return res
}

export async function loginUser(data) {
    const res = await fetch(`http://localhost:3000/api/v1/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: include
    })
    return res
}

export async function authUser() {
    const res = await fetch(`${BASEURL}/api/v1/auth/me`, {
        method: "GET",
        credentials: "include"
    })

    return res
}