import listsModel from "./lists-model.js";

const userSaveBook = async (userId, bookID) => {
    const bookInList = await listsModel.create({listedBy: userId, bookID: bookID})
    return bookInList
}

const userUnsaveBook = async (userId, bookID) => {
    return listsModel.deleteOne({bookID: bookID, listedBy: userId})
}

const findAllBooksSavedByUser = (userId) => {
    return listsModel.find({listedBy: userId})
}

const findUserSavedBook = async (userId, bookID) => {
    return listsModel.findOne({bookID: bookID, listedBy: userId})
}
export default {
    userSaveBook, userUnsaveBook, findAllBooksSavedByUser,
    findUserSavedBook
}
