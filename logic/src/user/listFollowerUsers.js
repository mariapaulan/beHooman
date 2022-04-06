const { models: { User } } = require('data')
const { validators: { validateId } } = require('commons')


function listFollowerUsers(userId) {

    validateId(userId, 'user id')

    return User.findById(userId).lean().populate('followers')
        .then(user => {
            if (!user) throw Error(`user with id ${userId} does not exist`)
            
            user.followers.forEach(follower => {
                    follower.id = follower._id.toString()
                    delete follower._id
                    delete follower.__v
                    delete follower.email
                    delete follower.password
                    delete follower.favorites
                    delete follower.notifications
                    delete follower.followers
                    delete follower.following
    
                    return follower
                }
            )
            return user.followers
        })
}


module.exports = listFollowerUsers