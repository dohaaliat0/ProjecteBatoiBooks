import './style.css';
import './functions.js';
import '/srv/services/datos.js';

document.querySelector('#app').innerHTML = `
  <div style="text-align: center;">
    <img src="/logoBatoi.png" alt="CIP FP Batoi logo" style="width: 150px;" />
    <h1>BatoiBooks</h1>
    <p>Abre la consola para ver el resultado</p>
  </div>
`;
// 1. Mostrar todos los libros del usuario 4
const librosUsuario4 = libros.filter(libro => libro.usuarioId === 4);
console.log("Libros del usuario 4:", librosUsuario4);

// 2. Mostrar todos los libros del módulo 5021 que están en buen estado ("good")
const librosModulo5021Good = libros.filter(libro => libro.moduloId === 5021 && libro.estado === "good");
console.log("Libros del módulo 5021 en buen estado:", librosModulo5021Good);

// 3. Incrementar el precio de todos los libros un 10%
const librosConPrecioIncrementado = libros.map(libro => {
  return { ...libro, precio: libro.precio * 1.10 };
});
console.log("Libros con precio incrementado:", librosConPrecioIncrementado);
