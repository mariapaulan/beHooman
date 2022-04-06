const { models: { User } } = require('data')
const { validators: { validateUsername, validateEmail, validatePassword } } = require('commons')


function registerUser(username, email, password) {
    
    validateUsername(username)
    validateEmail(email)
    validatePassword(password)

    return User.create({ username, email, password })
        .then(user => {})
}


module.exports = registerUser