const { models: { User, Action, Schedule } } = require('data')
const { validators: { validateId, validatePassword } } = require('commons')


function deleteUser(userId, password) {
    validateId(userId)
    validatePassword(password)

    return User.findById(userId).lean().populate('following').populate('followers')
        .then(user => {
            if (!user) throw Error(`user with id ${userId} not found`)

            return Promise.all([
                Schedule.deleteMany({ user: userId }),
                Schedule.find().lean().populate('action'),
                User.findOne({ username: 'anonymous' }).lean(),
                User.find({ _id: { $in: user.followers } }),
                User.find({ _id: { $in: user.following } })
            ])
        })
        .then(([result, schedules, anonymous, followers, following]) => {

            if (!anonymous) throw Error(`user anonymous doesn't exist`)
            const userAsAuthorScheduledActionsIds = schedules.filter(schedule => schedule.action.author._id === userId).forEach(schedule => schedule.action._id)
            //aqui tengo las acciones que deben pasar a anonymous

            const followersPromises = followers.map(follower => {

                const index = follower.following.indexOf(userId)
                follower.following.splice(index, 1)

                return follower.save()
            })

            const followingPromises = following.map(follow => {

                const index = follow.followers.indexOf(userId)
                follow.followers.splice(index, 1)

                return follow.save()
            })


            return Promise.all([
                Action.updateMany({ _id: { $in: userAsAuthorScheduledActionsIds } }, { author: anonymous._id }), 
                ...followersPromises, 
                ...followingPromises])
        })
        .then(([result, promise1, promise2]) => {
            return Promise.all([User.deleteOne({ _id: userId, password }), Action.deleteMany({ author: userId })])
        })
        .then(([result]) => {
            if (result.deletedCount === 0) throw Error(`wrong user ${userId} or password`)
        })
}


module.exports = deleteUser