import mongoose from '../db/mongodb'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true,
        set(val: string) {
            return bcrypt.hashSync(val, 10)
        }
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

const User = mongoose.model('User', UserSchema)
export default User
