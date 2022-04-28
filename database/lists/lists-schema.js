import mongoose from "mongoose";
const listsSchema = mongoose.Schema({
    listedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UsersModel'},
    bookID: String
}, {collection: "lists"})
export default listsSchema;