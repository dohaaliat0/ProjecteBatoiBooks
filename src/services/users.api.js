const SERVER = "http://localhost:3000/users";

export async function getDBUsers(){
    const response = await fetch(SERVER)
    if(!response.ok){
        throw `Error ${response.status} de la BBDD: ${response.statusText}` 
    }
    const posts = await response.json()
    return posts

}

export async function getDBUser(userId) {
    const response = await fetch(SERVER + '/' + userId)
    if(!response.ok){
        throw `Error ${response.status} de la BBDD: ${response.statusText}` 
    }
    const posts = await response.json()
    return posts
}

export async function addDBUser(userData) {
    const response = await fetch(SERVER,{
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        throw `Error ${response.status} al añadir el usuario: ${response.statusText}`;
    }

    const result = await response.json();
    return result;
}

export async function removeDBUser(userId) {
    const response = await fetch(SERVER + '/' + userId, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
        throw `Error ${response.status} al borrar el usuario: ${response.statusText}`;
    }
    return await response.json();
}

export async function changeDBUser(userData) {
    const response = await fetch(SERVER + '/' + userData.id,{
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        throw `Error ${response.status} al cambiar el usuario: ${response.statusText}`;
    }

    const result = await response.json();
    return result;
}

export async function changeDBUserPassword(userId, newPassword) {
    const response = await fetch(SERVER + '/' + userId,{
        method: 'PATCH',
        body: JSON.stringify({
            password: newPassword
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw `Error ${response.status} al cambiar la contraseña: ${response.statusText}`;
    }

    const result = await response.json();
    return result;
}