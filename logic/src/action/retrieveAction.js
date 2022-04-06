const { models: { Action, User } } = require('data')
const { validators: { validateId } } = require('commons')


function retrieveAction(userId, actionId) {

    validateId(userId, 'user id')
    validateId(actionId, 'action id')

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw Error(`user with id ${userId} not found`)
            return Action.findById(actionId).lean().populate('author')
        })
        .then(action => {

            if (!action) throw new Error(`action with id ${actionId} does not exist`)

            if (!(action.author._id.toString() === userId) && !action.public) throw new Error(`action with id ${actionId} is not public`)

            if (action.author._id.toString() === userId || action.public) {

                action.id = action._id.toString()

                delete action._id
                delete action.__v

                action.authorId = action.author._id.toString()
                action.authorUsername = action.author.username

                delete action.author

                return action
            }
        })
}


module.exports = retrieveAction