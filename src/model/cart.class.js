export default class Cart {
    constructor() {
        this.data = [];
    }

    populate() {
    }

    getBookById(id) {
        return this.data.find(item => item.id === id) || null;
    }

    addItem(book) {
        if (this.getBookById(book.id)) {
            throw new Error("El libro ya está en el carrito.");
        }
        this.data.push({ ...book });
    }

    removeItem(id) {
        const index = this.data.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error("El libro no está en el carrito.");
        }
        this.data.splice(index, 1);
    }

    toString() {
        return this.data.map(book => book.toString());
    }
}
