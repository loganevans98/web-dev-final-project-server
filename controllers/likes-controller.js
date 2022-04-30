
import likesDao from "../database/likes/likes-dao.js";
import booksDao from "../database/books/books-dao.js";

const userLikesBook = async(req, res)=>{
    const uid = req.params.uid
    const bid = req.params.bid
    const bookLiked = likesDao.userLikesBook(uid, bid);
    res.json(bookLiked)
}

const userUnlikesBook = async(req, res)=>{
    const uid = req.params.uid
    const bid = req.params.bid
    const status = likesDao.userUnlikesBook(uid, bid);
    res.json(status)
}

/*
const userTogglesLike = async (req, res) => {
    const uid = req.params.uid
    const bid = req.params.bid
    try{
        const userAlreadyLikedBook = await likesDao.findUserLikedBook(uid, bid);
        if (userAlreadySavedTuit) {
            await listsDao.userUnsaveBook(userId, bookID)
        } else {
            await listsDao.userSaveBook(userId, bookID)
        }
        res.sendStatus(200)
    } catch (e) {
        res.sendStatus(404)
    }
}

 */

const findAllBooksSavedByUser = async(req, res)=>{
    try {
        const userId = req.params.userId
        const list = await listsDao.findAllBooksSavedByUser(userId);
        res.json(list)
    } catch (err) {
        res.status(500).send(err);
    }
}



const findMostRecentSavesByUser = async(req, res) => {
    try {
        const userId = req.params.userId
        const list = await listsDao.findMostRecentSavesByUser(userId);
        res.json(list)
    } catch (err) {
        res.status(500).send(err);
    }
}

const listController = (app) => {
    app.post("/api/users/:uid/likes/:bid", userLikesBook)
    app.delete("/api/users/:uid/likes/:bid", userUnlikesBook)
    app.get("/api/users/:userId/lists", findAllBooksSavedByUser)
    app.get("/api/users/:userId/lists/recent", findMostRecentSavesByUser)
    app.put("/api/users/:userId/lists/:bookID", userTogglesSave)
}

export default listController;

