const { updateSchedule, completeSchedule } = require('logic')
const { verifyTokenAndGetUserId } = require('../../helpers')


module.exports = (req, res) => {
    try {
        const userId = verifyTokenAndGetUserId(req)
        const { body, params: { scheduleId } } = req

        if (Object.keys(body).length > 0) {
            const { date: _date, repeat } = body
            const date = new Date(_date)
            updateSchedule(userId, scheduleId, date, repeat)
                .then(() => res.status(200).send())
                .catch(error => res.status(400).json({ error: error.message }))
        }
        else {
            completeSchedule(userId, scheduleId)
                .then(() => res.status(200).send())
                .catch(error => res.status(400).json({ error: error.message }))
        }



    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}