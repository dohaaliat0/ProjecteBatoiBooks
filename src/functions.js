function getBookById(books, bookId) {
    let book = books.find((item) => item.id === bookId);
    if (!book) {
        throw new Error("No existe ese Id de libro.");
    } 
    return book;
}

function getBookIndexById(books, bookId) {
    let index = books.findIndex((item) => item.id === bookId);
    if (index === -1) {
        throw new Error("No existe ese índice de libro.");
    }
    return index;
}

function bookExists(books, userId, moduleCode) {
    return books.some((item) => item.userId === userId && item.moduleCode === moduleCode);
}

function booksFromUser(books, userId) {
    return books.filter((item) => item.userId === userId);
}

function booksFromModule(books, moduleCode) {
    return books.filter((item) => item.moduleCode === moduleCode);
}

function booksCheeperThan (books, price) {
    return books.filter((item) => item.price <= price);
};

function booksWithStatus (books, status) {
    return books.filter((item) => item.status === status);
};

function averagePriceOfBooks (books) {
    if (books.length === 0) {
        return '0.00 €'; 
    }
    const totalPrice = books.reduce((acc, item) => acc + item.price, 0);
    return `${(totalPrice / books.length).toFixed(2)} €`; 
};

function booksOfTypeNotes(books) {
    const notesBooks = books.filter((item) => item.publisher === 'Apunts');
    return notesBooks;
}

function booksNotSold(books) {
    const librosNovendidos = books.filter((item) => item.sold === false);
    return librosNovendidos; 
}

function incrementPriceOfbooks(books, percentage) {
    if (!books || books.length === 0) {
        return []; 
    }
    return books.map(item => {
        item.price = parseFloat((item.price * (1 + percentage)).toFixed(2)); 
        return item;  
    });
}


function getUserById(users, userId) {
    let user = users.find((item) => item.id === userId);
    if (!user) {
        throw new Error("No existe ese usuario.");
    }
    return user;
}

function getUserIndexById(users, userId) {
    let index = users.findIndex((item) => item.id === userId);
    if (index === -1) {
        throw new Error("No existe ese usuario.");
    }
    return index;
}

function getUserByNickName(users, nick) {
    let usuario = users.find((item) => item.nick === nick);
    if (!usuario) {
        throw new Error(`No existe un usuario con el nombre de usuario "${nick}".`);
    }
    return usuario;
}

function getModuleByCode(modules, moduleCode) {
    let module = modules.find((item) => item.code === moduleCode);
    if (!module) {
        throw new Error(`No existe un módulo con el código "${moduleCode}".`);
    }
    return module;
}

export {
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
    incrementPriceOfbooks,
    getUserById,
    getUserIndexById,
    getUserByNickName,
    getModuleByCode
};
