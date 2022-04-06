const { validators: { validateId, validateString, validateNumber, validateDate } } = require('commons')
const { models: { Schedule, Action, User } } = require('data')


function createSchedule(userId, actionId, date, repeat = 'once') {

    validateId(userId, 'user id')
    validateId(actionId, 'action id')
    validateDate(date)
    validateString(repeat)

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw Error(`user with id ${userId} not found`)
            return Action.findById(actionId).lean().populate('author')
        })
        .then(action => {
            if (!action) throw new Error(`action with id ${actionId} does not exist`)
            if (action.author._id.toString() === userId || action.public) {
                return Schedule.create({ user: userId, action: actionId, date, repeat })
                    .then(({ id }) => id)
            }
            else throw new Error(`action with id ${actionId} is not public`)
        })
}


module.exports = createSchedule
