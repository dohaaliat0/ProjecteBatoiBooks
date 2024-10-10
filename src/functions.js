export {
    getBookById,
    getBookIndexById,
    bookExists,
    booksFromUser,
    booksFromModule,
    booksCheeperThan,
    booksWithStatus,
    averagePriceOfBooks,
    booksOfTypeNote,
    booksNotSold,
    incrementPriceOfbooks,
    getUserById,
    getUserIndexById,
    getUserByNickName,
    getModuleByCode
  }

function getBookById(books, bookId) {
    let book = books.find((item) => item.id === bookId);

    if (!book) {
        throw new Error("No existe ese libro.");
    } else {
        return book;
    } 
}

function getBookIndexById(books, bookId) {
    let bookIndex = books.findIndex(book => book.id === bookId);
    if (index === -1) {
        throw new Error("No existe el index de ese libro");
    }
    return index;
}

function bookExists(books, userId, moduleCode) {
    return books.some(book => book.userId === userId && book.moduleCode === moduleCode);
}

function booksFromUser(books, userId) {
    return books.filter(book => book.userId === userId);
}

function booksFromModule(books, moduleCode) {
    return books.filter(book => book.moduleCode === moduleCode);
}

function booksCheeperThan(books, price) {
    return books.filter(book => book.price <= price);
}

function booksWithStatus(books, status) {
    return books.filter(book => book.status === status);
}

function averagePriceOfBooks(books) {
    const totalPrice = books.reduce((sum, book) => sum + book.price, 0);
    const averagePrice = (totalPrice / books.length).toFixed(2);
    return `${averagePrice} €`;
}

function booksOfTypeNotes(books) {
    return books.filter(book => book.type === 'notes');
}

function booksNotSold(books) {
    return books.filter(book => !book.isSold);
}

function incrementPriceOfBooks(books, percentage) {
    return books.map(book => ({
        ...book,
        price: book.price * (1 + percentage)
    }));
}

function getUserById(users, userId) {
    const user = users.find(user => user.id === userId);
    if (!user) {
        throw new Error(`User with ID ${userId} not found`);
    }
    return user;
}


function getUserIndexById(users, userId) {
    const index = users.findIndex(user => user.id === userId);
    if (index === -1) {
        throw new Error(`User with ID ${userId} not found`);
    }
    return index;
}

function getUserByNickName(users, nick) {
    const user = users.find(user => user.nick === nick);
    if (!user) {
        throw new Error(`User with nickname ${nick} not found`);
    }
    return user;
}

function getModuleByCode(modules, moduleCode) {
    const module = modules.find(module => module.code === moduleCode);
    if (!module) {
        throw new Error(`Module with code ${moduleCode} not found`);
    }
    return module;
}
