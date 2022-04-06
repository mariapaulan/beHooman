const sanitizeAction = (action) => {
    action.id = action._id.toString()
    action.authorId = action.author._id.toString()
    action.authorUsername = action.author.username
    delete action.author
    delete action._id
    delete action.__v
    delete action.public

    return action
}


module.exports = {
    sanitizeAction
}