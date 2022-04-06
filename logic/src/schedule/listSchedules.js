const { models: { Schedule, User } } = require('data')
const { validators: { validateId } } = require('commons')


function listSchedules(userId) {
    validateId(userId, 'user id')

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw Error(`user with id ${userId} not found`)
            return Schedule.find({ user: userId, repeat: { $ne: 'none' } }).lean().populate('action')
        })
        .then(schedules => {
            if (!schedules) throw new Error(`no schedules found for user with id ${userId}`)

            schedules.forEach(schedule => {
                schedule.id = schedule._id.toString()
                delete schedule._id
                delete schedule.__v
                schedule.actionId = schedule.action._id.toString()
                schedule.actionDescription = schedule.action.description
                schedule.actionRequiredTime = schedule.action.requiredTime
                schedule.actionRequiredBudget = schedule.action.requiredBudget
                delete schedule.action
                delete schedule.user
            })
            return schedules
        })

}


module.exports = listSchedules