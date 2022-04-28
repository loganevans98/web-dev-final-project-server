import mongoose from "mongoose";
import booksSchema from "./books-schema.js";
const booksModel = mongoose.model(
    'BooksModel',
    booksSchema
)
export default booksModel;