const { createSchedule } = require('logic')
const { verifyTokenAndGetUserId } = require('../../helpers')


module.exports = (req, res) => {
    try {
        const userId = verifyTokenAndGetUserId(req)
        const { body: { date: _date, repeat }, params: { actionId } } = req

        const date = new Date(_date)

        createSchedule(userId, actionId, date, repeat)
            .then(scheduleId => res.json(scheduleId))
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

