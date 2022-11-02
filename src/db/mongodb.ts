import mongoose from 'mongoose'
import { ConnectOptions } from "mongoose"
const { MONGODB_CONF } = require('../config/db')

const { 
    path,
    port,
    database 
} = MONGODB_CONF
const url = `mongodb://${path}:${port}/${database}`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as ConnectOptions)

mongoose.connection.once('open', () => {
    console.log(`${database}数据库连接成功！`);
})

mongoose.connection.once('error', () => {
    console.log(`${database}数据库连接失败！`);
})

export default mongoose
