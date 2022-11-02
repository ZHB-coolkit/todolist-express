import mongoose from '../db/mongodb'

const TodoSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    status: {
        type: Number,
        default: 0
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
