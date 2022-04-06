const { model } = require('mongoose')
const { schedule } = require('../schemas')

const Schedule = model('Schedule', schedule)

module.exports = Schedule