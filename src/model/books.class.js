import Book from './book.class';

export default class Books {
    constructor() {
        this.data = [];
    }

    populate(bookArray) {
        this.data = bookArray.map(book => new Book(book));
    }

    addBook(bookData) {
        const newBook = new Book({ id: this._generateId(), ...bookData });
        this.data.push(newBook);
        return newBook;
    }

    removeBook(bookId) {
        const index = this.getBookIndexById(bookId);
        this.data.splice(index, 1);
    }

    changeBook(bookData) {
        const index = this.getBookIndexById(bookData.id);
        const updatedBook = new Book(bookData);
        this.data[index] = updatedBook;
        return updatedBook;
    }

    getBookById(bookId) {
        const book = this.data.find(item => item.id === bookId);
        if (!book) {
            throw new Error('No existe ese Id de libro.');
        }
        return book;
    }

    getBookIndexById(bookId) {
        const index = this.data.findIndex(item => item.id === bookId);
        if (index === -1) {
            throw new Error('No existe ese índice de libro.');
        }
        return index;
    }

    bookExists(userId, moduleCode) {
        return this.data.some(item => item.userId === userId && item.moduleCode === moduleCode);
    }

    booksFromUser(userId) {
        return this.data.filter(item => item.userId === userId);
    }

    booksFromModule(moduleCode) {
        return this.data.filter(item => item.moduleCode === moduleCode);
    }

    booksCheeperThan(price) {
        return this.data.filter(item => item.price <= price);
    }

    booksWithStatus(status) {
        return this.data.filter(item => item.status === status);
    }

    averagePriceOfBooks() {
        if (this.data.length === 0) {
            return '0.00 €';
        }
        const totalPrice = this.data.reduce((acc, item) => acc + item.price, 0);
        return `${(totalPrice / this.data.length).toFixed(2)} €`;
    }

    booksOfTypeNotes() {
        return this.data.filter(item => item.publisher === 'Apunts');
    }

    booksNotSold() {
        return this.data.filter(item => !item.soldDate);
    }

    incrementPriceOfbooks(percentage) {
        this.data = this.data.map(item => {
            item.price = parseFloat((item.price * (1 + percentage)).toFixed(2));
            return item;
        });
    }

    _generateId() {
        return this.data.length > 0 ? Math.max(...this.data.map(book => book.id)) + 1 : 1;
    }

    toString() {
        return this.data.map(book => book.toString()).join('\n');
    }
}
