import dislikesModel from "./dislikes-model.js";

const userDislikesBook = async (userId, bookID) => {
    const bookDisliked = await dislikesModel.create({dislikedBy: userId, bookID: bookID})
    return bookDisliked
}

const userUndislikesBook = async (userId, bookID) => {
    return dislikesModel.deleteOne({dislikedBy: userId, bookID: bookID})
}

const findAllBooksDislikedByUser = (userId) => {
    return dislikesModel.find({dislikedBy: userId})
}

const findAllUsersDislikedBook = (bookID) => {
    return dislikesModel.find({bookID: bookID})
}

const findMostRecentDislikesByUser = (userId) => {
    return dislikesModel.find({dislikedBy: userId}).sort({_id:-1}).limit(3);
}

const findUserDislikedBook = async (userId, bookID) => {
    return dislikesModel.findOne({bookID: bookID, dislikedBy: userId})
}

export default {
    userDislikesBook, userUndislikesBook, findAllBooksDislikedByUser,
    findUserDislikedBook, findMostRecentDislikesByUser, findAllUsersDislikedBook
}
