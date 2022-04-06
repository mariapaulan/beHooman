const { models: { User } } = require('data')
const { validators: { validateId } } = require('commons')


function listFollowingUsers(userId) {

    validateId(userId, 'user id')

    return User.findById(userId).lean().populate('following')
        .then(user => {
            if (!user) throw Error(`user with id ${userId} does not exist`)

            user.following.forEach(follow => {

                follow.id = follow._id.toString()
                delete follow._id
                delete follow.__v
                delete follow.email
                delete follow.password
                delete follow.favorites
                delete follow.notifications
                delete follow.following
                delete follow.followers

                return follow
            })

            return user.following
        })
}


module.exports = listFollowingUsers