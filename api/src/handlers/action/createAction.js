const { createAction } = require('logic')
const { verifyTokenAndGetUserId } = require('../../helpers')


module.exports = (req, res) => {
    try {
        const userId = verifyTokenAndGetUserId(req)
        const { body: { description, public, requiredTime, requiredBudget } } = req

        createAction(userId, description, public, requiredTime, requiredBudget)
            .then(actionId => res.json(actionId))
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

