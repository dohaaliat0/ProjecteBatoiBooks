import Modules from "../model/modules.class"
import Books from "../model/books.class"
import Users from "../model/users.class"
import View from "../view/view.class"
import Cart from "../model/cart.class.js";

export default class Controller{
    constructor(){
        this.model = {
            modules: new Modules(),
            users: new Users(),
            books: new Books(),
            cart: new Cart()
        };
        this.view = new View()
    }
    async init(){
        this.view.esconderSecciones();
        await this.model.modules.populate()
        await this.model.users.populate()
        await this.model.books.populate()
        this.view.renderModulesOptions(this.model.modules.data)
        this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this))
        await this.renderBooks();

        this.handleRouteChange()
        window.addEventListener("hashchange", this.handleRouteChange.bind(this))
    }

    handleRouteChange() {
        document.querySelector("#list").style.display = "none";
        document.querySelector("#form").style.display = "none";
        document.querySelector("#about").style.display = "none";
        document.querySelector(window.location.hash).style.display = 'block'
    }

    async handleSubmitBook(payload){

        if (!payload.id) {
            const newBook = await this.model.books.addBook(payload)
            this.view.renderBook(this.model.modules, newBook)
            this.view.renderMessage("check", "El libro se ha añadido correctamente");
        } else {
            await this.model.books.changeBook(payload)
            document.getElementById("list").innerText = ""
            await this.renderBooks();
            document.getElementById("title").innerText = "Añadir libro";
            document.getElementById("id-book").style.display = "none";
            this.view.renderMessage("check", "El libro se ha modificado correctamente");
        }

        this.view.esconderSecciones();
        document.getElementById("list").style.display = 'block'
    }

    async renderBooks () {
        this.model.books.data.forEach((book) => {
            const div = this.view.renderBook(this.model.modules, book);
            div.querySelector(".delete").addEventListener("click", async () => {
                if (await this.model.books.getBookById(book.id)) {
                    await this.model.books.removeBook(book.id)
                    this.view.removeBook(book.id)
                    this.view.renderMessage("check", "El libro se ha eliminado correctamente.");
                } else {
                    this.view.renderMessage("error", "El libro no se ha eliminado correctamente.");
                }
            });

            div.querySelector(".edit").addEventListener("click", async () => {
                this.view.esconderSecciones();
                document.getElementById("form").style.display = 'block'
                this.view.editBook(book);
            });

            div.querySelector(".add").addEventListener("click", async () => {
                if (!!this.model.cart.getBookById(book.id)) {
                    this.view.renderMessage("error", "El libro ya está añadido. Carrito: " + this.model.cart.data.length);
                } else {
                    this.model.cart.addItem(book);
                    this.view.renderMessage("check", "El libro se ha añadido correctamente. Carrito: " + this.model.cart.data.length);
                }
            });
        });
    }
}