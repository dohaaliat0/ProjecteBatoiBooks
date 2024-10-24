const SERVER = "http://localhost:3000/books";

async function getDBBooks(){
    const response = await fetch(SERVER)
    if(!response.ok){
        throw `Error ${response.status} de la BBDD: ${response.statusText}` 
    }
    const posts = await response.json()
    return posts

}

async function getDBBook(bookId) {
    const response = await fetch(SERVER + '/' + bookId)
    if(!response.ok){
        throw `Error ${response.status} de la BBDD: ${response.statusText}` 
    }
    const posts = await response.json()
    return posts
}

async function addBook(bookData) {
    const response = await fetch(SERVER,{
        method: 'POST',
        body: JSON.stringify(bookData),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        throw `Error ${response.status} al añadir el libro: ${response.statusText}`;
    }

    const result = await response.json();
    return result;
}

async function removeDBBook(bookData) {
    const response = await fetch(SERVER, '/' + bookData.id,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
    });

    if (!response.ok) {
        throw `Error ${response.status} al borrar el libro: ${response.statusText}`;
    }

    const result = await response.json();
    return result;
}

async function changeDBBook(bookData) {
    const response = await fetch(SERVER, '/' + bookData.id,{
        method: 'PUT',
        body: JSON.stringify(bookData),
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
    });

    if (!response.ok) {
        throw `Error ${response.status} al cambiar el libro: ${response.statusText}`;
    }

    const result = await response.json();
    return result;
}

{
    
}