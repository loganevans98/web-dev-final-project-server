import mongoose from "mongoose";
const booksSchema = mongoose.Schema({
    title: String,
    bookID: {type: String},
    authors: Array,
    pageCount: Number,
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
}, {collection: "books"})
export default booksSchema;