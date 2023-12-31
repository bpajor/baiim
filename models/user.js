import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    walletAmount: {
        type: Number,
        required: true,
    },
});

const User = mongoose.model("User", userSchema);
export { User };