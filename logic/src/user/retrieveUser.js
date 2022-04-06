const { models: { User, Schedule } } = require('data')
const { validators: { validateId } } = require('commons')


function retrieveUser(userId) {

    validateId(userId, 'user id')

    let completedSchedules = 0

    return Schedule.find({ user: userId })
        .then(schedules => {
            schedules.forEach(schedule => {
                completedSchedules += schedule.completed.length
            })
            return User.findById(userId).lean().select('username email notifications')
        })
        .then(user => {
            if (!user) throw Error(`user with id ${userId} does not exist`)

            user.doneActs = completedSchedules
            delete user._id
            delete user.__v

            return user
        })
}


module.exports = retrieveUser