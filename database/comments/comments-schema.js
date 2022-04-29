import mongoose from "mongoose";
const commentsSchema = mongoose.Schema({
    comment: String,
    bookID: String,
    bookTitle: String,
    commenterEmail: String,
    bookLink: String,
    commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UsersModel'}
}, {collection: 'comments'})

export default commentsSchema