import './style.css';
import logoBatoi from '/logoBatoi.png';
import Controller from "./src/controller/controller.class"

document.querySelector('#app').innerHTML = `
  <header>
      <img src="${logoBatoi}" class="logo" alt="Vite logo" />
      <h1>BatoiBooks</h1>
  </header>
  <nav>
  <ul>
    <li><a href="#list">Ver Libros</a></li>
    <li><a href="#form">Añadir Libro</a></li>
    <li><a href="#about">Acerca de...</a></li>
  </ul>
</nav>
<div id="list"></div>
<div id="form">
<div>
  <label for="id-remove">Id:</label>
  <input type="text" id="id-remove">
  <button id="remove">Borrar libro</button>
</div>
<form id="bookForm">
  <div>
    <label for="id-module">Módulo:</label>
    <select id="id-module">
      <option disabled>- Selecciona un módulo -</option>
    </select>
  </div>

  <div>
    <label for="publisher">Editorial:</label>
    <input type="text" id="publisher" required>
  </div>

  <div>
    <label for="price">Precio:</label>
    <input type="number" id="price">
  </div>

  <div>
    <label for="pages">Páginas:</label>
    <input type="number" id="pages">
  </div>

  <div>
    <label>Estado:</label>
    <input type="radio" id="new" value="new" name="status">
    <label for="new">Nuevo</label>
    <input type="radio" id="old" value="old" name="status">
    <label for="old">Viejo</label>
  </div>

  <div>
    <label for="comments">Comentarios:</label>
    <textarea id="comments"></textarea>
  </div>

  <button type="submit">Añadir</button>
  <button type="reset">Reset</button>
</form>
 </div>
<div id="about" class="content-section">
  <h2>Acerca de BatoiBooks</h2>
  <p>
    BatoiBooks es una aplicación dedicada a gestionar y catalogar tus libros favoritos. 
    Ofrece una manera simple y efectiva de organizar información sobre diferentes títulos, 
    incluyendo detalles como el módulo, editorial, precio, número de páginas, estado y 
    comentarios personalizados.
  </p>
  <p>
    Nuestro objetivo es proporcionar una experiencia de usuario fluida y agradable para 
    ayudarte a llevar un registro de tus lecturas de manera sencilla.
  </p>
</div>
`;

document.addEventListener('DOMContentLoaded', () => {
  const myController = new Controller()
  myController.init()
})