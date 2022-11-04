import mongoose from '../db/mongodb'
import { ETodoStatus } from '../ts/enum/ETodo'

const TodoSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    status: {
        type: Number,
        default: ETodoStatus.UNFINISHED
    },
    userId: {
        type: String,
        require: true
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
})

const Todo = mongoose.model('Todo', TodoSchema)
export default Todo
