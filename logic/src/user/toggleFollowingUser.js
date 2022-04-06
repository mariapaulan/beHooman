const { models: { User } } = require('data')
const { validators: { validateId } } = require('commons')
const { user } = require('data/src/schemas')


function toggleFollowingUser(userId, followId) {

    validateId(userId, 'user id')
    validateId(followId, 'follow id')

    return Promise.all([User.findById(userId), User.findById(followId)])
        .then(([user, follow]) => {
            if (!user) throw Error(`user with id ${userId} does not exist`)
            if (!follow) throw Error(`user with id ${followId} does not exist`)

            const index1 = user.following.indexOf(followId)
            const index2 = follow.followers.indexOf(userId)

            if (index1 === -1) {
                user.following.push(followId)
                follow.followers.push(userId)
            } else {
                user.following.splice(index1, 1)
                follow.followers.splice(index2, 1)
            }
            return Promise.all([user.save(), follow.save()])
        })
        .then(() => { })
}


module.exports = toggleFollowingUser