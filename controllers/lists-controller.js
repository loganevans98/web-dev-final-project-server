import listsDao from "../database/lists/lists-dao.js";

const userSaveBook = async(req, res)=>{
    const userId = req.params.userId
    const bookID = req.params.bookID
    const bookInList = listsDao.userSaveBook(userId, bookID);
    res.json(bookInList)
}

const userUnsaveBook = async(req, res)=>{
    const bookID = req.params.bookID
    const userId = req.params.userId
    const status = listsDao.userUnsaveBook(userId, bookID);
    res.json(status)
}

const userTogglesSave = async (req, res) => {
    const bookID = req.params.bookID
    const userId = req.params.userId
    try{
        const userAlreadySavedTuit = await listsDao.findUserSavedBook(userId, bookID);
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
    app.post("/api/users/:userId/lists/:bookID", userSaveBook)
    app.delete("/api/users/:userId/lists/:bookID", userUnsaveBook)
    app.get("/api/users/:userId/lists", findAllBooksSavedByUser)
    app.get("/api/users/:userId/lists/recent", findMostRecentSavesByUser)
    app.put("/api/users/:userId/lists/:bookID", userTogglesSave)
}

export default listController;