const { model } = require('mongoose')
const { action } = require('../schemas')

const Action = model('Action', action)

module.exports = Action