import booksDao from "../database/books/books-dao.js";

const likeBook = async (req, res) => {
    let book = req.body
    book = await booksDao.likeBook(book)
    res.json(book)
}

const dislikeBook = async (req, res) => {
    let book = req.body
    book = await booksDao.dislikeBook(book)
    res.json(book)
}


const deleteBookById = async (req, res) => {
    const id = req.params.id
    const status = await booksDao.deleteBookById(id)
    res.json(status)
}

const findAllBooks = async (req, res) => {
    const books = await booksDao.findAllBooks()
    res.json(books)
}

const findBookByBookID = async (req, res) => {
    const bookID = req.params.bookID
    const book = await booksDao.findBookByBookID(bookID)
    res.json(book)
}

const createBook = async (req, res) => {
    let book = req.body;
    book = await booksDao.createBook(book)
    res.json(book)
}

const bookController = (app) => {
    app.post('/api/likes', likeBook)
    app.post('/api/dislikes', dislikeBook)
    app.get('/api/books/:bookID', findBookByBookID)
    app.post('/api/books', createBook)
    app.get('/api/books', findAllBooks)
    app.delete('/api/books/:id', deleteBookById)
}

export default bookController;