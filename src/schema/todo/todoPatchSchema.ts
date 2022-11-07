import Schema from "validate"

export default new Schema({
    // '0': 未完成，'1': 已完成
    status: {
        required: true,
        type: String,
        enum: ['0', '1']
    }
})
