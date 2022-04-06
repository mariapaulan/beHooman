const { registerUser } = require('logic')


module.exports = (req, res) => {
    try {
        const { body: { username, email, password } } = req
        registerUser(username, email, password)
            .then(() => res.status(201).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}