import dislikesDao from "../database/dislikes/dislikes-dao.js";
import booksDao from "../database/books/books-dao.js";

const userDislikesBook = async (req, res) => {
    const userId = req.params.userId
    const bookID = req.params.bookID
    const bookDisliked = dislikesDao.userDislikesBook(userId, bookID);
    res.json(bookDisliked)
}

const userUndislikesBook = async (req, res) => {
    const userId = req.params.userId
    const bookID = req.params.bookID
    const status = dislikesDao.userUndislikesBook(userId, bookID);
    res.json(status)
}

const userTogglesDislike = async (req, res) => {
    const userId = req.params.userId
    const bookID = req.params.bookID
    let book = req.body

    try{
        let existingBook = await booksDao.findBookExistsByBookID(bookID)
        console.log('existingBook:', existingBook);
        if (existingBook) {
            const userAlreadyDislikedBook = await dislikesDao.findUserDislikedBook(userId, bookID);

            if (userAlreadyDislikedBook) {
                await dislikesDao.userUndislikesBook(userId, bookID)
                await booksDao.updateDislikesByMinus(existingBook, bookID)
            } else {
                await dislikesDao.userDislikesBook(userId, bookID)
                await booksDao.updateDislikesByPlus(existingBook, bookID)
            }
        } else {
            await dislikesDao.userDislikesBook(userId, bookID)
            existingBook = await booksDao.createBook({
                ...book,
                dislikes: 1
            })
        }
        res.sendStatus(200)
    } catch (e) {
        console.log('error:', e);
        res.sendStatus(404)
    }
}

const findAllBooksDislikedByUser = async (req, res) => {
    try {
        const userId = req.params.userId
        const dislikeList = await dislikesDao.findAllBooksDislikedByUser(userId);
        res.json(dislikeList)
    } catch (err) {
        res.status(500).send(err);
    }
}

const findMostRecentDislikesByUser = async (req, res) => {
    try {
        const userId = req.params.userId
        const dislikeList = await dislikesDao.findMostRecentSavesByUser(userId);
        res.json(dislikeList)
    } catch (err) {
        res.status(500).send(err);
    }
}

const findAllUsersDislikedBook = async (req, res) => {
    const bookID = req.params.bookID
    const userList = await dislikesDao.findAllUsersDislikedBook(bookID);
    res.json(userList);
}

const findIfUserDislikeBook = async (req, res) => {
    const {userId, bookID} = req.params;
    const dislike = await dislikesDao.findUserDislikedBook(userId, bookID);
    res.json(dislike);
}

const dislikesController = (app) => {
    app.post("/api/users/:userId/dislikes/:bookID", userDislikesBook)
    app.delete("/api/users/:userId/dislikes/:bookID", userUndislikesBook)
    app.get("/api/users/:userId/dislikes", findAllBooksDislikedByUser)
    app.get("/api/users/:userId/dislikes/recent", findMostRecentDislikesByUser)
    app.put("/api/users/:userId/dislikes/:bookID", userTogglesDislike)
    app.get("/api/dislikes/:bookID/users", findAllUsersDislikedBook)
    app.get("/api/users/:userId/dislikes/:bookID", findIfUserDislikeBook)
}

export default dislikesController;