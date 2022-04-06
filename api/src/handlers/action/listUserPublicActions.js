const { listUserPublicActions } = require('logic')
const { verifyTokenAndGetUserId } = require('../../helpers')


module.exports = (req, res) => {
    try {
        const userId = verifyTokenAndGetUserId(req)
        const { params: { consultedUserId } } = req

        listUserPublicActions(userId, consultedUserId)
            .then(actions => res.json(actions))
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}