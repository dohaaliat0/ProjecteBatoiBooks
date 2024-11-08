export default class View {
    constructor() {
        this.bookList = document.getElementById("list")
        this.about = document.getElementById("about")
        this.form = document.getElementById("form")
        this.remove = document.getElementById("remove")
        this.bookForm = document.getElementById("bookForm")
        this.message = document.getElementById("comments")
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

    renderBooks(moduleClass, books){
        books.forEach(book => {
            this.renderBook(moduleClass, book)
        })
    }

    renderBook(moduleClass, book) {
        const newDiv = document.createElement("div")
        newDiv.id = book.id;
        const module = moduleClass.getModuleByCode(book.moduleCode);
        newDiv.innerHTML = `
            <div>
                <h3><strong>ID:</strong> ${book.id}</h3>
                <h3><strong>Modulo:</strong> ${ module.cliteral }</h3>
                <h4><strong>Editorial:</strong> ${book.publisher}</h4>
                <p><strong>Precio:</strong> ${book.price}</p>
                <p><strong>Paginas:</strong> ${book.pages}</p>
                <p><strong>Estado:</strong> ${book.status}</p>
                <p><strong>Comentarios:</strong> ${book.comments}</p>
            </div>
        `
        this.bookList.appendChild(newDiv)
    }

    removeBook(bookId) {
        const bookElement = document.getElementById(bookId);
        bookElement.remove();
    }

    renderMessage(message) {

    }

    setBookSubmitHandler(callback) {
        this.bookForm.addEventListener('submit', (event) => {
            event.preventDefault()
            const moduleCode = document.getElementById("id-module").value
            const publisher = document.getElementById("publisher").value
            const price = document.getElementById("price").value
            const pages = document.getElementById("pages").value
            const status = document.querySelector('input[name="status"]:checked').value;
            const comments = document.getElementById("comments").value
            const payload = {
                moduleCode,
                publisher,
                price,
                pages,
                status,
                comments
            }
            callback(payload)
            document.getElementById('bookForm').reset()
        })
    }

    setBookRemoveHandler(callback) {
        this.remove.addEventListener('click', () => {
            const idToRemove = document.getElementById("id-remove").value
            callback(idToRemove)
            document.getElementById("id-remove").value = ""
        })
    }

    esconderSecciones() {
        document.getElementById("list").style.display = "none";
        document.getElementById("form").style.display = "none";
        document.getElementById("about").style.display = "none";
    }
}