const { models: { User, Action, Schedule } } = require("data")
const { validators: { validateId, validateString, validateBoolean, validateNumber } } = require('commons')


function updateAction(userId, actionId, description, public, requiredTime, requiredBudget) {

    validateId(userId, 'user id')
    validateId(actionId, 'action id')
    validateString(description, 'description')
    validateBoolean(public, 'public')
    validateNumber(requiredTime, 'required time')
    validateNumber(requiredBudget, 'required budget')

    let anonymous

    return User.findOne({ username: 'anonymous' }).lean()
        .then(_anonymous => {
            if (!_anonymous) throw new Error(`user anonymous doesn't exist`)
            anonymous = _anonymous
            return User.findById(userId).lean()
        })
        .then(user => {
            if (!user) throw Error(`user with id ${userId} not found`)
            return Schedule.find({ action: actionId })
        })
        .then(schedules => {
            if (schedules.length === 0) {
                return Action.updateOne({ _id: actionId, author: userId }, { description, public, requiredTime, requiredBudget })
                    .then(result => {
                        if (result.matchedCount === 0) throw new Error(`action with id ${actionId} and userId ${userId} does not exist`)
                    })
            }
            else {
                return Action.updateOne({ _id: actionId, author: userId }, { author: anonymous._id })
                    .then(result => {
                        if (result.matchedCount === 0) throw new Error(`action with id ${actionId} and userId ${userId} does not exist`)
                        return Action.create({ author: userId, description, public, requiredTime, requiredBudget })
                    })
                    .then(action => { })
            }
        })
}


module.exports = updateAction