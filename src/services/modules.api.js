const SERVER = "http://localhost:3000/modules";

async function getDBModules(){
    const response = await fetch(SERVER)
    if(!response.ok){
        throw `Error ${response.status} de la BBDD: ${response.statusText}` 
    }
    const posts = await response.json()
    return posts

}

{
    
}