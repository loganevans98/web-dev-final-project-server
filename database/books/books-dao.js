import booksModel from "./books-model.js"

const createBook = (book) => {
    return booksModel.create(book)
}

const deleteBook = (book) => {
    return booksModel.deleteOne({bookID: book.bookID})
}

const deleteBookById = (id) => {
    return booksModel.deleteOne({_id: id})
}

const findAllBooks = () => {
    return booksModel.find()
}

const likeBook = async (book) => {
    let existingBook = await booksModel.findOne({bookID: book.bookID})
    if(existingBook) {
        // update the number of likes in book data
        await booksModel.updateOne({bookID: book.bookID}, {
            $set: {likes: existingBook.likes + 1}
        })
        existingBook.likes++
    } else {
        // insert a book in the collection called books
        try {
            existingBook = await booksModel.create({
                ...book,
                likes: 1,
                dislikes: 0
            })
        } catch(e) {
            alert(e)
        }
    }
    return existingBook
}

const findBookByBookID = async (bookID) => {
    const book = await booksModel.findOne({bookID})
    return book
}

export default {
    createBook, deleteBook, likeBook, findBookByBookID, findAllBooks, deleteBookById
};