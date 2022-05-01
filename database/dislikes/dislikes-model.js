import mongoose from "mongoose";
import dislikesSchema from "./dislikes-schema.js";
const dislikesModel = mongoose.model(
    'DislikesModel',
    dislikesSchema
)
export default dislikesModel;