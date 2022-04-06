const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const schedule = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },  

    action: {
        type: ObjectId,
        ref: 'Action',
        required: true
    },  

    date: {
        type: Date,
        required: true,
    },

    repeat: {
        type: String,
        enum : ['once', 'daily', 'weekly', 'biweekly', 'monthly', 'none'],
        default: 'once',
        required: true,
    },

    completed: [{
        type: Date
    }]
})

module.exports = schedule