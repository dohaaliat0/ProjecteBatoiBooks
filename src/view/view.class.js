import Books from "../model/books.class.js";

export default class View {
    constructor() {
        this.bookList = document.getElementById("list")
        this.about = document.getElementById("about")
        this.form = document.getElementById("form")
        this.remove = document.getElementById("remove")
        this.bookForm = document.getElementById("bookForm")
        this.message = document.getElementById("message")
    }
    renderModulesOptions(modules) {
        modules.forEach(module => {
            const option = document.createElement("option")
            option.innerHTML = module.cliteral
            option.value = module.code

            const select = document.getElementById("id-module")
            select.appendChild(option)
        });
    }

    renderBook(moduleClass, book) {
        const newDiv = document.createElement("div");
        newDiv.id = book.id;
        const module = moduleClass.getModuleByCode(book.moduleCode);

        newDiv.innerHTML = `
        <div>
            <h3><strong>ID:</strong> ${book.id}</h3>
            <h3><strong>Módulo:</strong> ${module.cliteral}</h3>
            <h4><strong>Editorial:</strong> ${book.publisher}</h4>
            <p><strong>Precio:</strong> ${book.price}</p>
            <p><strong>Páginas:</strong> ${book.pages}</p>
            <p><strong>Estado:</strong> ${book.status}</p>
            <p><strong>Comentarios:</strong> ${book.comments}</p>
            <button class="add">
                <span class="material-icons">icono add_shopping_cart</span>
            </button>
            <button class="edit">
                <span class="material-icons">icono edit</span>
            </button>
            <button class="delete">
                <span class="material-icons">icono delete</span>
            </button>
        </div>
    `;

        this.bookList.appendChild(newDiv);
        return newDiv;
    }

    editBook(book) {
        document.getElementById("title").innerText = "Editar libro";
        document.getElementById("remove-book").style.display = "none";
        document.getElementById("id-book").style.display = "block";
        document.getElementById("id").value = book.id;
        document.getElementById("id-module").value = book.moduleCode;
        document.getElementById("publisher").value = book.publisher;
        document.getElementById("price").value = book.price;
        document.getElementById("pages").value = book.pages;
        document.querySelector(`input[name="status"][value="${book.status}"]`).checked = true;
        document.getElementById("comments").value = book.comments;
    }


    removeBook(bookId) {
        const bookElement = document.getElementById(bookId);
        bookElement.remove();
    }

    renderMessage(type, message) {
        const DOMnewMessage = document.createElement('div');
        DOMnewMessage.innerHTML = `${message} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" style="background-color: #ff2d2d; color: white" onclick="document.getElementById('message').innerText = ''">x</button> `;
        DOMnewMessage.className  = type + " alert alert-danger alert-dismissible";
        DOMnewMessage.setAttribute('role',"alert");
        this.message.appendChild(DOMnewMessage);
    }

    setBookSubmitHandler(callback) {
        this.bookForm.addEventListener('submit', async (event) => {
            event.preventDefault()
            const booksApi = new Books();
            await booksApi.populate();
            const erroresDiv = document.getElementById('errores');
            erroresDiv.innerHTML = '';
            let hayErrores = false;

            const id = document.getElementById("id").value
            const moduleCode = document.getElementById("id-module").value
            const publisher = document.getElementById("publisher").value
            const price = document.getElementById("price").value
            const pages = document.getElementById("pages").value
            const status = document.querySelector('input[name="status"]:checked')?.value;
            const comments = document.getElementById("comments").value

            if (!publisher || publisher.length <= 0) {
                this.addErrorMessage('La editorial es obligatorio');
                hayErrores = true;
            }

            if (!pages || pages <= 0) {
                this.addErrorMessage('Las paginas deben ser un número mayor que 0.');
                hayErrores = true;
            }

            if (!price || price <= 0) {
                this.addErrorMessage('El precio debe ser un número mayor que 0.');
                hayErrores = true;
            }

            if (!moduleCode) {
                this.addErrorMessage('Debe seleccionar un modulo.');
                hayErrores = true;
            }

            if (booksApi.getBookByModuleCode(moduleCode) !== null) {
                this.addErrorMessage('Debe seleccionar un modulo que no se haya seleccionado en otro libro.');
                hayErrores = true;
            }

            if (!hayErrores) {
                if (id === '') {
                    const payload = {
                        moduleCode,
                        publisher,
                        price,
                        pages,
                        status,
                        comments
                    }

                    if (booksApi.getBookIsClone(payload) !== null) {
                        this.addErrorMessage('Hay un libro igual que ya existe.');
                        document.getElementById('errores').style.display = 'block';
                        return;
                    }

                    callback(payload)
                } else {
                    const payload = {
                        id,
                        moduleCode,
                        publisher,
                        price,
                        pages,
                        status,
                        comments
                    }
                    callback(payload)
                }

                document.getElementById('errores').style.display = 'none';
                document.getElementById('bookForm').reset()
            } else {
                document.getElementById('errores').style.display = 'block';
            }
        })
    }

    addErrorMessage(message) {
        const errorParagraph = document.createElement('p');
        errorParagraph.textContent = message;
        document.getElementById('errores').appendChild(errorParagraph);
    }

    esconderSecciones() {
        document.getElementById("list").style.display = "none";
        document.getElementById("form").style.display = "none";
        document.getElementById("about").style.display = "none";
    }
}