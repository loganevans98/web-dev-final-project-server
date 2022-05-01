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

const findBookExistsByBookID = (bookID) => {
    return booksModel.findOne({bookID: bookID})
}

const updateLikesByPlus = (book, bookID) => {
    return booksModel.updateOne({bookID: bookID}, {$set:{likes: book.likes + 1}})
}

const updateLikesByMinus = (book, bookID) => {
    return booksModel.updateOne({bookID: bookID}, {$set:{likes: book.likes -1}})
}

const updateDislikesByPlus = (book, bookID) => {
    return booksModel.updateOne({bookID: bookID}, {$set: {dislikes: book.dislikes + 1}})
}

const updateDislikesByMinus = (book, bookID) => {
    return booksModel.updateOne({bookID: bookID}, {$set: {dislikes: book.dislikes - 1}})
}

const likeBook = async (book) => {
    let existingBook = await booksModel.findOne({bookID: book.bookID})
    if(existingBook) {
        // update the number of likes in book data
        await booksModel.updateOne({bookID: book.bookID}, {
            $set: {likes: existingBook.likes + 1}
        })
    } else {
        // insert a book in the collection called books
        try {
            existingBook = await createBook({
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

const dislikeBook = async (book) => {
    let existingBook = await booksModel.findOne({bookID: book.bookID})
    if(existingBook) {
        // update the number of likes in book data
        await booksModel.updateOne({bookID: book.bookID}, {
            $set: {dislikes: existingBook.dislikes + 1}
        })
        existingBook.dislikes++
    } else {
        // insert a book in the collection called books
        try {
            existingBook = await booksModel.create({
                ...book,
                likes: 0,
                dislikes: 1
            })
        } catch(e) {
            alert(e)
        }
    }
    return existingBook
}

const findBookByBookID = async (bookID) => {
    const book = await booksModel.findOne({bookID: bookID})
    return book
}

export default {
    createBook, deleteBook, likeBook, findBookByBookID, findAllBooks, deleteBookById,
    dislikeBook, findBookExistsByBookID, updateLikesByPlus, updateLikesByMinus, updateDislikesByPlus,
    updateDislikesByMinus
};