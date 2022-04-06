const { models: { Schedule, User } } = require('data')
const { validators: { validateId } } = require('commons')


function completeSchedule(userId, scheduleId) {

    validateId(userId, 'user id')
    validateId(scheduleId, 'schedule id')

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw Error(`user with id ${userId} not found`)
            return Schedule.findOne({ _id: scheduleId, user: userId })
        })
        .then(schedule => {
            if (!schedule) throw new Error(`schedule with id ${scheduleId} and user ${userId} does not exist`)

            schedule.completed.push(new Date())
            return schedule.save()
        })
        .then(() => { })
}


module.exports = completeSchedule