const { mongoose: { connect, disconnect }, models: { User, Action, Schedule } } = require('data')
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
    completeSchedule,
    createSchedule,
    listSchedules,
    retrieveSchedule,
    updateSchedule
} = require('./index')

let createdAction
let createdAction2
let createdSchedule
let createdSchedule2
let date = new Date('March 15, 2022 14:00:00')
let pau
let gio
let action1
let action2
let action3


connect('mongodb://localhost:27017/bHooman-db')
    .then(() => Promise.all([
        User.deleteOne({ email: 'pepito@grillo.com' }),
        User.findOne({ username: 'pau123' }),
        User.findOne({ username: 'gio123' }),
        Action.findOne({ description: "Participa en un voluntariado" }),
        Action.findOne({ description: "Adopta una mascota" }),
        Action.findOne({ description: "No comas alimentos de origen animal por hoy" })
    ]))

    .then(([result, _pau, _gio, _action1, _action2, _action3]) => {
        pau = _pau.id
        gio = _gio.id
        action1 = _action1.id
        action2 = _action2.id
        action3 = _action3.id

        return registerUser('pepitogrillo', 'pepito@grillo.com', '123123123')
    })
    .then(() => console.log('user registered'))

    .then(() => authenticateUser('pepito@grillo.com', '123123123'))
    .then(userId => console.log('user id', userId))

    .then(() => authenticateUser('pepito@grillo.com', '123123123'))
    .then(userId => {
        return updateUser(userId, 'pepagrilla12', 'pepito@grillo.com', false)
            .then(() => console.log('user updated'))
    })

    .then(() => authenticateUser('pepito@grillo.com', '123123123'))
    .then(userId => {
        return retrieveUser(userId)
            .then(user => console.log(user))
    })

    .then(() => authenticateUser('pepito@grillo.com', '123123123'))
    .then(userId => {
        return retrieveUserPublicInfo(userId, userId)
            .then(user => console.log(user))
    })

    .then(() => authenticateUser('pepito@grillo.com', '123123123'))
    .then(userId => {
        return updateUserPassword(userId, '123123123', '234234234')
            .then(() => console.log('password updated'))
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return toggleFavoriteAction(userId, action1)
            .then(() => console.log('favorite toggled'))
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return toggleFavoriteAction(userId, action2)
            .then(() => console.log('favorite toggled'))
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return toggleFavoriteAction(userId, action3)
            .then(() => console.log('favorite toggled'))
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return toggleFavoriteAction(userId, action3)
            .then(() => console.log('favorite toggled'))
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return listFavoriteActions(userId)
            .then(favorites => console.log(favorites))
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return toggleFollowingUser(userId, pau)
            .then(() => console.log('friend toggled'))
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return toggleFollowingUser(userId, gio)
            .then(() => console.log('friend toggled'))
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return listFollowingUsers(userId)
            .then(follows => console.log('following:', follows))
    })

    .then(() => authenticateUser('pau@mail.com', '123123123'))
    .then(userId => {
        return listFollowerUsers(userId)
            .then(followers => console.log('followers', followers))
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return findUsers(userId, '123')
            .then(users => console.log(users))
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return createAction(userId, 'Regala algo que no uses a una persona que lo necesite', true, 5, 0)
            .then(actionId => {
                createdAction = actionId
                console.log('action created', actionId)
            })
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return createAction(userId, 'Invita a un desayuno a un necesitado', true, 10, 5)
            .then(actionId => {
                createdAction2 = actionId
                console.log('action created', actionId)
            })
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return retrieveAction(userId, createdAction2)
            .then(action => console.log(action))
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return updateAction(userId, createdAction2, 'Usa medios de transporte sostenibles hoy', false, 60, 0)
            .then(() => console.log('action updated'))
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return retrieveAction(userId, createdAction2)
            .then(action => console.log(action))
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return listActions(userId)
            .then(actions => console.log(actions))
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return listUserPublicActions(userId, userId)
            .then(actions => console.log(actions))
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => findActions(userId, 'regala', null, null))
    .then(result => console.log(result))

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return createSchedule(userId, createdAction, date, 'monthly')
            .then(scheduleId => {
                createdSchedule = scheduleId
                console.log('schedule created', scheduleId)
            })
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        date = new Date('March 27, 2022 08:00:00')
        return createSchedule(userId, createdAction2, date)
            .then(scheduleId => {
                createdSchedule2 = scheduleId
                console.log('schedule created', scheduleId)
            })
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return retrieveSchedule(userId, createdSchedule)
            .then(schedule => console.log(schedule))
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        date = new Date('March 25, 2022 10:00:00')
        return updateSchedule(userId, createdSchedule, date, 'biweekly')
            .then(() => console.log('schedule updated'))
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return retrieveSchedule(userId, createdSchedule)
            .then(schedule => console.log(schedule))
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return completeSchedule(userId, createdSchedule)
            .then(() => console.log('schedule completed'))
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return retrieveSchedule(userId, createdSchedule)
            .then(schedule => console.log(schedule))
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return listSchedules(userId)
            .then(schedules => console.log(schedules))
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return cancelSchedule(userId, createdSchedule)
            .then(() => console.log('schedule canceled'))
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return retrieveSchedule(userId, createdSchedule)
            .then(schedule => console.log(schedule))
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return cancelSchedule(userId, createdSchedule2)
            .then(() => console.log('schedule canceled'))
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return deleteAction(userId, createdAction)
            .then(() => console.log('action deleted'))
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return deleteAction(userId, createdAction2)
            .then(() => console.log('action deleted'))
    })

    .then(() => authenticateUser('pepito@grillo.com', '234234234'))
    .then(userId => {
        return deleteUser(userId, '234234234')
            .then(() => console.log('user deleted'))
    })

    .catch(error => console.error(error.message))
    .then(() => disconnect())