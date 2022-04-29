import commentsModel from "./comments-model.js";

const postComment = async (userId, bookID, comment) => {
    comment.commenter = userId
    comment.bookID = bookID
    const actualComment = await commentsModel.create(comment)
    return actualComment
}

const deleteComment = async (userId, bookID) => {
    commentsModel.deleteOne({commenter: userId, bookID})

}

const findCommentsByBookID = (bookID) =>
    commentsModel.find({bookID})

const findCommentsByUserId = (userId) =>
    commentsModel.find({commenter: userId})

const findAllComments = () => {
    return commentsModel.find()
}

const findAllMostRecentComments = () => {
    return commentsModel.find().sort({_id:-1}).limit(10);
}

const deleteCommentById = (id) =>
    commentsModel.deleteOne({_id: id})

export default {
    postComment, findCommentsByBookID, findCommentsByUserId, findAllComments, deleteCommentById,
    deleteComment, findAllMostRecentComments
}