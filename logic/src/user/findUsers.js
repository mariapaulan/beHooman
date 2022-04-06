const { models: { User } } = require('data')
const { validators: { validateString } } = require('commons')


function findUsers(userId, query) {
    let filter = {}
    if (query) {
        validateString(query, 'query')
        filter = { username: { $regex: `.*${query}*.`, $options: 'i' } }
    }

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw Error(`user with id ${userId} not found`)
            return User.find(filter).lean().select('username')
        })
        .then(users => {
            users.forEach(user => {
                user.id = user._id.toString()
                delete user._id
                delete user.__v
            })
            return users
        })
}


module.exports = findUsers