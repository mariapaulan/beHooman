const { models: { Action, User } } = require('data')
const { helpers: { sanitizeAction }, validators: { validateString, validateNumber, validateId } } = require('commons')


function findActions(userId, query = null, requiredTime = null, requiredBudget = null) {
    validateId(userId, 'user id')

    if (query === null && requiredBudget === null && requiredTime === null)
        return new Promise(resolve => resolve([]))

    if (!(query === null)) validateString(query, 'query')
    if (!(requiredTime === null)) validateNumber(requiredTime, 'required time')
    if (!(requiredBudget === null)) validateNumber(requiredBudget, 'required budget')

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw Error(`user with id ${userId} not found`)

            const filters = { public: true }

            if (query) {
                const queryRegex = new RegExp(query, 'i')
                filters.description = queryRegex
            }

            if (requiredTime || requiredTime === 0) filters.requiredTime = requiredTime

            if (requiredBudget || requiredBudget === 0) filters.requiredBudget = requiredBudget

            return Action.find(filters).lean().populate('author')
        })
        .then(actions => {
            actions.forEach(action => sanitizeAction(action))
            return actions
        })
}


module.exports = findActions