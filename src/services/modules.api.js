const SERVER = "http://localhost:3000/modules";

export async function getDBModules() {
    const response = await fetch(SERVER);
    if (!response.ok) {
        throw new Error(`Error ${response.status} de la BBDD: ${response.statusText}`);
    }
    const modules = await response.json();
    return modules;
}
