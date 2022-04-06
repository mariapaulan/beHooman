const { toggleFollowingUser } = require('logic')
const { verifyTokenAndGetUserId } = require('../../helpers')


module.exports = (req, res) => {
    try {
        const userId = verifyTokenAndGetUserId(req)
        const { params: { followId } } = req

        toggleFollowingUser(userId, followId)
            .then(() => res.status(200).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}