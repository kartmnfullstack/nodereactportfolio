import mongoose, { Schema } from "mongoose";

const Tasks = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    task:{
        type: String,
        required: true,
        unique: true
    },
    comments:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending',
        required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usersforportfolios',
        required: true,
    },
    email:{
        type: String,
        required: true
    }

},{timestamps: true})

const TaskList = mongoose.models.Tasks || mongoose.model("TaskList",Tasks);

export default TaskList;