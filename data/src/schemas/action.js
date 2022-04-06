const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const action = new Schema({
    description: {
        type: String,
        required: true,
    },

    public: {
        type: Boolean,
        required: true,
        default: false,
    },

    requiredTime: {
        type: Number,
        required: true,
    },

    requiredBudget: {
        type: Number,
        required: true,
    },

    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    } 
})

module.exports = action