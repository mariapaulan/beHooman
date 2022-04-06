const { models: { User, Schedule } } = require('data')
const { validators: { validateId } } = require('commons')


function retrieveUserPublicInfo(userId, consultedUserId) {

    validateId(userId, 'user id')
    let completedSchedules = 0

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw Error(`user with id ${userId} not found`)
            return Schedule.find({ user: consultedUserId })
        })
        .then(schedules => {
            schedules.forEach(schedule => {
                completedSchedules += schedule.completed.length
            })
            return User.findById(consultedUserId).select('username').lean()
        })
        .then(consultedUser => {
            if (!consultedUser) throw Error(`user with id ${consultedUser} does not exist`)

            consultedUser.id = consultedUser._id.toString()
            consultedUser.doneActs = completedSchedules
            delete consultedUser._id
            delete consultedUser.__v

            return consultedUser
        })
}


module.exports = retrieveUserPublicInfo