import mongoose from "mongoose";
const usersSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    userType: {type: String, enum: ['REGULAR', 'ADMIN', 'MODERATOR'], default: 'REGULAR'}
}, {collection: "users"})

export default usersSchema;