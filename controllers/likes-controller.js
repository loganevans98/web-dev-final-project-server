import likesDao from "../database/likes/likes-dao.js";
import booksDao from "../database/books/books-dao.js";

const userLikesBook = async (req, res) => {
    const userId = req.params.userId
    const bookID = req.params.bookID
    const bookLiked = likesDao.userLikesBook(userId, bookID);
    res.json(bookLiked)
}

const userUnlikesBook = async (req, res) => {
    const userId = req.params.userId
    const bookID = req.params.bookID
    const status = likesDao.userUnlikesBook(userId, bookID);
    res.json(status)
}

const userTogglesLike = async (req, res) => {
    const userId = req.params.userId
    const bookID = req.params.bookID
    let book = req.body

    try{
        let existingBook = await booksDao.findBookExistsByBookID(bookID)
        console.log('existingBook==>>', existingBook);
        if (existingBook) {
            const userAlreadyLikedBook = await likesDao.findUserLikedBook(userId, bookID);

            if (userAlreadyLikedBook) {
                await likesDao.userUnlikesBook(userId, bookID)
                await booksDao.updateLikesByMinus(existingBook, bookID)
            } else {
                await likesDao.userLikesBook(userId, bookID)
                await booksDao.updateLikesByPlus(existingBook, bookID)
            }
        } else {
                await likesDao.userLikesBook(userId, bookID)
                existingBook = await booksDao.createBook({
                    ...book,
                    likes: 1,
                })
        }
        res.sendStatus(200)
    } catch (e) {
        console.log('error:', e);
        res.sendStatus(404)
    }
}

const findAllBooksLikedByUser = async (req, res) => {
    try {
        const userId = req.params.userId
        const likeList = await likesDao.findAllBooksLikedByUser(userId);
        res.json(likeList)
    } catch (err) {
        res.status(500).send(err);
    }
}

const findMostRecentLikesByUser = async (req, res) => {
    try {
        const userId = req.params.userId
        const likeList = await likesDao.findMostRecentSavesByUser(userId);
        res.json(likeList)
    } catch (err) {
        res.status(500).send(err);
    }
}

const findAllUsersLikedBook = async (req, res) => {
    const bookID = req.params.bookID
    const userList = await likesDao.findAllUsersLikedBook(bookID);
    res.json(userList);
}

const findIfUserLikeBook = async (req, res) => {
    const {userId, bookID} = req.params;
    const like = await likesDao.findUserLikedBook(userId, bookID);
    res.json(like);
}

const likesController = (app) => {
    app.post("/api/users/:userId/likes/:bookID", userLikesBook)
    app.delete("/api/users/:userId/likes/:bookID", userUnlikesBook)
    app.get("/api/users/:userId/likes", findAllBooksLikedByUser)
    app.get("/api/users/:userId/likes/recent", findMostRecentLikesByUser)
    app.put("/api/users/:userId/likes/:bookID", userTogglesLike)
    app.get("/api/likes/:bookID/users", findAllUsersLikedBook)
    app.get("/api/users/:userId/likes/:bookID", findIfUserLikeBook)
}

export default likesController;

