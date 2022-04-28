import mongoose from "mongoose";
const commentsSchema = mongoose.Schema({
    comment: String,
    bookID: String,
    commenterEmail: String,
    commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UsersModel'}
}, {collection: 'comments'})

export default commentsSchema