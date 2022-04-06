const { models: { User } } = require("data")
const { validators: { validateId, validatePassword } } = require('commons')


function updateUserPassword(userId, currPassword, newPassword) {

    validateId(userId, 'user id')
    validatePassword(currPassword, 'current password')
    validatePassword(newPassword, 'new password')

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw Error(`user with id ${userId} does not exist`)
            return User.updateOne({ _id: userId, password: currPassword }, { password: newPassword })
        })
        .then(result => {
            if (result.matchedCount === 0) throw Error('wrong credentials')
        })
}


module.exports = updateUserPassword