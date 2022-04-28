import listsModel from "./lists-model.js";

const userSaveBook = async (userId, bookID) => {
    const bookInList = await listsModel.create({bookID: bookID, listedBy: userId})
    return bookInList
}

const userUnsaveBook = async (userId, bookID) => {
    listsModel.deleteOne({bookID: bookID, listedBy: userId})
}
const findAllBooksSavedByUser = async (userId) =>{
    listsModel.find({listedBy: userId})
}
export default {
    userSaveBook, userUnsaveBook, findAllBooksSavedByUser
}
