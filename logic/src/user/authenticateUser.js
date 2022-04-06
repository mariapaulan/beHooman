const { models: { User } } = require('data')
const { validators: { validateEmail, validatePassword } } = require('commons')


function authenticateUser(email, password) {

    validateEmail(email)
    validatePassword(password)
    
    return User.findOne({ email, password }).lean()
        .then(user => {
            if (!user) throw Error('wrong credentials')
            
            return user._id.toString()
        })
}


module.exports = authenticateUser