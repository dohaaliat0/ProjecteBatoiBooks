import 'index.html';
import { 
  getBookById, 
  getBookIndexById, 
  bookExists, 
  booksFromUser, 
  booksFromModule, 
  booksCheeperThan, 
  booksWithStatus, 
  averagePriceOfBooks, 
  booksOfTypeNotes, 
  booksNotSold, 
  incrementPriceOfbooks 
} from './src/functions.js';
import data from './srv/services/datos.js'; 

document.querySelector('#app').innerHTML = `
  <div style="text-align: center;">
    <img src="/logoBatoi.png" alt="CIP FP Batoi logo" style="width: 150px;" />
    <h1>BatoiBooks</h1>
    <p>Abre la consola para ver el resultado</p>
  </div>
`;

console.log('Libros del usuario 4:', booksFromUser(data.books, 4));

console.log('Libros del módulo 5021 en buen estado:', booksWithStatus(booksFromModule(data.books, "5021"), "good"));

console.log('Libros con precio incrementado en un 10%:', incrementPriceOfbooks(data.books, 0.1));
