import mongoose from "mongoose";
const dislikesSchema = mongoose.Schema({
    dislikedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UsersModel'},
    bookID: String
}, {collection: "dislikes"})
export default dislikesSchema;