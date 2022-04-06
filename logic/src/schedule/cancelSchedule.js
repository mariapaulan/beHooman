const { models: { Schedule, User } } = require('data')
const { validators: { validateId } } = require('commons')


function cancelSchedule(userId, scheduleId) {

    validateId(userId, 'user id')
    validateId(scheduleId, 'schedule id')

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw Error(`user with id ${userId} not found`)
            return Schedule.findOne({ _id: scheduleId, user: userId })
        })
        .then(schedule => {
            if (!schedule) throw new Error(`schedule with id ${scheduleId} for user id ${userId} does not exist`)

            if (schedule.completed.length > 0) {
                return Schedule.updateOne({ _id: scheduleId, user: userId }, { repeat: 'none' })
                    .then(schedule => {
                        if (!schedule) throw new Error(`schedule with id ${scheduleId} for user id ${userId} does not exist`)
                    })
            }
            else {
                return Schedule.deleteOne({ _id: scheduleId, user: userId })
                    .then(result => {
                        if (result.deletedCount === 0) throw new Error(`schedule with id ${scheduleId} and userId ${userId} does not exist`)
                    })
            }
        })

}


module.exports = cancelSchedule