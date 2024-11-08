import Modules from "../model/modules.class"
import Books from "../model/books.class"
import Users from "../model/users.class"
import View from "../view/view.class"

export default class Controller{
    constructor(){
        this.model = {
            modules: new Modules(),
            users: new Users(),
            books: new Books()
        };
        this.view = new View()
    }
    async init(){
        this.view.esconderSecciones();
        document.getElementById("list").style.display = 'block'
        await this.model.modules.populate()
        await this.model.users.populate()
        await this.model.books.populate()
        this.view.renderModulesOptions(this.model.modules.data)
        this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this))
        this.view.setBookRemoveHandler(this.handleRemoveBook.bind(this))
        this.view.renderBooks(this.model.modules, this.model.books.data)

        document.querySelector('a[href="#list"]').addEventListener('click', () => {
            this.view.esconderSecciones();
            document.getElementById("list").style.display = 'block'
        });

        document.querySelector('a[href="#form"]').addEventListener('click', () => {
            this.view.esconderSecciones();
            document.getElementById("form").style.display = 'block'
        });

        document.querySelector('a[href="#about"]').addEventListener('click', () => {
            this.view.esconderSecciones();
            document.getElementById("about").style.display = 'block'
        });
    }
    async handleSubmitBook(payload){
        const newBook = await this.model.books.addBook(payload)
        this.view.renderBook(this.model.modules, newBook)

    }

    handleRemoveBook(bookId){
        this.model.books.removeBook(bookId)
        this.view.removeBook(bookId)
    }
}