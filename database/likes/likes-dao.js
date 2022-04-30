import likesModel from "./likes-model.js";

const userLikesBook = async (uid, bid) => {
    return likesModel.create({likedBy: uid, book: bid})
}

const userUnlikesBook = async (uid, bid) => {
    return likesModel.deleteOne({likedBy: uid, book: bid})
}

const findAllBooksLikedByUser = (uid) => {
    return likesModel.find({likedBy: uid})
}


const findUserLikedBook = async (uid, bid) => {
    return likesModel.findOne({listedBy: uid, book: bid})
}

export default {
    userLikesBook, userUnlikesBook, findAllBooksLikedByUser, findUserLikedBook
}