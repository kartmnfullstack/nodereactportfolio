import mongoose, { Schema } from "mongoose";

const Userslist = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps: true})

const UsersList = mongoose.models.Userslist || mongoose.model("Usersforportfolios",Userslist);

export default UsersList;