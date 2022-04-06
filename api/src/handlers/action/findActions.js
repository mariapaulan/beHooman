const { findActions } = require('logic')
const { verifyTokenAndGetUserId } = require('../../helpers')


module.exports = (req, res) => {
    try {
        const userId = verifyTokenAndGetUserId(req)

        let { query: { query = null, requiredBudget = null, requiredTime = null } } = req

        requiredBudget = requiredBudget && Number(requiredBudget)
        requiredTime = requiredTime && Number(requiredTime)

        findActions(userId, query, requiredTime, requiredBudget)
            .then(actions => res.json(actions))
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}