import mongoose from "mongoose";
const likesSchema = mongoose.Schema({
    likedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UsersModel'},
    bookID: String
}, {collection: "likes"})
export default likesSchema;