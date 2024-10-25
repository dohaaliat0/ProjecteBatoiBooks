async function getDBModules() {
    const response = await fetch(SERVER);
    if (!response.ok) {
        throw new Error(`Error ${response.status} de la BBDD: ${response.statusText}`);
    }
    const modules = await response.json();
    console.log('Datos de módulos recibidos:', modules); // Verifica los datos aquí
    return modules;
}
