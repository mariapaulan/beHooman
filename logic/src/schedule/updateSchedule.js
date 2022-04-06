const { models: { Schedule, User } } = require("data")
const { validators: { validateId, validateString, validateDate } } = require('commons')


function updateSchedule(userId, scheduleId, date, repeat) {

    validateId(userId, 'user id')
    validateId(scheduleId, 'schedule id')
    validateDate(date, 'date')
    validateString(repeat, 'repeat')

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw Error(`user with id ${userId} not found`)
            return Schedule.updateOne({ _id: scheduleId, user: userId }, { date, repeat })
        })
        .then(result => {
            if (result.matchedCount === 0) throw new Error(`schedule with id ${scheduleId} for user id ${userId} does not exist`)
        })
}


module.exports = updateSchedule