import Schema from "validate"

export default new Schema({
    keyword: {
        type: String
    },
    status: {
        type: String,
        enum: ['0', '1']
    }
})
