import likesModel from "./likes-model.js";

const userLikesBook = async (userId, bookID) => {
    const bookLiked = await likesModel.create({likedBy: userId, bookID: bookID})
    return bookLiked
}

const userUnlikesBook = async (userId, bookID) => {
    return likesModel.deleteOne({likedBy: userId, bookID: bookID})
}

const findAllBooksLikedByUser = (userId) => {
    return likesModel.find({likedBy: userId})
}

const findAllUsersLikedBook = (bookID) => {
    return likesModel.find({bookID: bookID})
}

const findMostRecentLikesByUser = (userId) => {
    return likesModel.find({likedBy: userId}).sort({_id:-1}).limit(3);
}

const findUserLikedBook = async (userId, bookID) => {
    return likesModel.findOne({bookID: bookID, likedBy: userId})
}

export default {
    userLikesBook, userUnlikesBook, findAllBooksLikedByUser,
    findUserLikedBook, findMostRecentLikesByUser, findAllUsersLikedBook
}
