import listsDao from "../database/lists/lists-dao.js";

const userSaveBook = async(req, res)=>{
    const bookID = req.params.bookID
    const userId = req.params.userId
    const bookInList = listsDao.userSaveBook(userId, bookID);
    res.json(bookInList)
}

const userUnsaveBook = async(req, res)=>{
    const bookID = req.params.bookID
    const userId = req.params.userId
    const status = listsDao.userUnsaveBook(userId, bookID);
    res.json(status)
}

const findAllBooksSavedByUser = async(req, res)=>{
    const userId = req.params.userId
    const list = listsDao.findAllBooksSavedByUser(userId);
    res.json(list)
}

const listController = (app) => {
    app.post("api/users/:userId/lists/:bookID", userSaveBook)
    app.delete("api/users/:userId/lists/:bookID", userUnsaveBook)
    app.get("api/users/:userId/lists", findAllBooksSavedByUser)
}

export default listController;