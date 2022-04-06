require('dotenv').config()
const { mongoose: { connect, disconnect } } = require('data')
const express = require('express')
const {
    authenticateUser,
    deleteUser,
    findUsers,
    listFollowerUsers,
    listFollowingUsers,
    registerUser,
    retrieveUser,
    retrieveUserPublicInfo,
    toggleFollowingUser,
    updateUser,
    updateUserPassword,
    createAction,
    deleteAction,
    findActions,
    listActions,
    listFavoriteActions,
    listUserPublicActions,
    retrieveAction,
    toggleFavoriteAction,
    updateAction,
    cancelSchedule,
    createSchedule,
    listSchedules,
    retrieveSchedule,
    updateSchedule
} = require('./handlers')
const cors = require('cors')

const { env: { PORT, MONGODB_URL } } = process


connect(MONGODB_URL)
    .then(() => console.log('db connected'))
    .then(() => {
        const server = express()
        server.use(cors())
        const jsonBodyParser = express.json()
        const api = express.Router()

        api.post('/users', jsonBodyParser, registerUser)
        api.post('/users/auth', jsonBodyParser, authenticateUser)
        api.get('/users', retrieveUser)
        api.get('/users/followers', listFollowerUsers)
        api.get('/users/following', listFollowingUsers)
        api.get('/users/search', findUsers)
        api.get('/users/:consultedUserId/actions', listUserPublicActions)
        api.get('/users/:consultedUserId', retrieveUserPublicInfo)
        api.patch('/users', jsonBodyParser, updateUser)
        api.patch('/users/:followId/following', toggleFollowingUser)
        api.patch('/users/change-password', jsonBodyParser, updateUserPassword)
        api.delete('/users', jsonBodyParser, deleteUser)
        
        api.post('/actions', jsonBodyParser, createAction)
        api.get('/actions', listActions)
        api.get('/actions/search', findActions)
        api.get('/actions/favorites', listFavoriteActions)
        api.get('/actions/:actionId', retrieveAction)
        api.patch('/actions/:actionId/favorites', jsonBodyParser, toggleFavoriteAction)
        api.patch('/actions/:actionId', jsonBodyParser, updateAction)
        api.delete('/actions/:actionId', deleteAction)

        api.post('/schedules/:actionId', jsonBodyParser, createSchedule)
        api.get('/schedules', listSchedules)
        api.get('/schedules/:scheduleId', retrieveSchedule)
        api.patch('/schedules/:scheduleId', jsonBodyParser, updateSchedule)
        api.delete('/schedules/:scheduleId', cancelSchedule)

        server.use('/api', api)

        server.listen(PORT, () => console.log('server started'))
    })
