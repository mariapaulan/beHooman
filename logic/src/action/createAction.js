const { validators: { validateId, validateString, validateBoolean, validateNumber } } = require('commons')
const { models: { Action, User } } = require('data')


function createAction(userId, description, public, requiredTime, requiredBudget) {

    validateId(userId, 'user id')
    validateString(description, 'description')
    validateBoolean(public, 'public')
    validateNumber(requiredTime, 'required time')
    validateNumber(requiredBudget, 'required budget')

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw Error(`user with id ${userId} not found`)
            return Action.create({ author: userId, description, public, requiredTime, requiredBudget })
        })
        .then(({ id }) => id)
}


module.exports = createAction


    // return Action.findOne({description, public: true})
    // .then(action=>{
    //     if(action) throw new Error('a public action with this description already exists')
