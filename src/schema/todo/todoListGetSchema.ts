import Schema from "validate"

export default new Schema({
    keyword: {
        type: String
    },
    // '0': 未完成，'1': 已完成
    status: {
        type: String,
        enum: ['0', '1']
    }
})
