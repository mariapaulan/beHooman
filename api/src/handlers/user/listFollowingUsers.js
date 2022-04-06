const { listFollowingUsers } = require('logic')
const { verifyTokenAndGetUserId } = require('../../helpers')


module.exports = (req, res) => {
    try {
        const userId = verifyTokenAndGetUserId(req)

        listFollowingUsers(userId)
            .then(friends => res.json(friends))
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}