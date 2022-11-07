import Schema from "validate"

export default new Schema({
    status: {
        required: true,
        type: String,
        enum: ['0', '1']
    }
})
