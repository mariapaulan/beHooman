const { models: { User, Action } } = require('data')
const { validators: { validateId } } = require('commons')


function toggleFavoriteAction(userId, actionId) {

    validateId(userId, 'user id')
    validateId(actionId, 'action id')


    return Action.findById(actionId).lean().populate('author')
        .then(action => {
            if (!action) throw Error(`action with id ${actionId} does not exist`)
            if (action.author._id.toString() !== userId && !action.public) throw Error(`action with id ${actionId} is not public`)
            return User.findById(userId)
        })
        .then(user => {
            if (!user) throw Error(`user with id ${userId} does not exist`)

            const index = user.favorites.indexOf(actionId)

            if (index === -1) user.favorites.push(actionId)
            else user.favorites.splice(index, 1)

            return user.save()
        })
        .then(() => { })
}


module.exports = toggleFavoriteAction