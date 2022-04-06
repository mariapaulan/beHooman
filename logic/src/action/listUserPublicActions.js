const { models: { Action, User } } = require('data')
const { validators: { validateId }, helpers: { sanitizeAction } } = require('commons')


function listUserPublicActions(userId, consultedUserId) {

    validateId(userId, 'user id')
    validateId(consultedUserId, 'consulted user id')

    return Promise.all([User.findById(userId).lean(), User.findById(consultedUserId).lean()])
        .then(([user, consultedUser]) => {
            if (!user) throw Error(`user with id ${userId} not found`)
            if (!consultedUser) throw Error(`user with id ${consultedUserId} not found`)
            return Action.find({ author: consultedUserId, public: true }).lean().populate('author')
        })
        .then(actions => {
            actions.forEach(action => sanitizeAction(action))
            return actions
        })
}


module.exports = listUserPublicActions