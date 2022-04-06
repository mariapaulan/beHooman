import { validators } from 'commons'
const { validateToken, validateId, validateString, validateDate } = validators


function updateSchedule(token, scheduleId, date = null, repeat = null) {
    validateToken(token)
    validateId(scheduleId)
    if (date) validateDate(date, 'date')
    if (repeat) validateString(repeat, 'repeat')

    let init = {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

    if (date && repeat) init.body = JSON.stringify({ date, repeat })
        
    else init.body = JSON.stringify({}) 

    return fetch(`http://localhost:8080/api/schedules/${scheduleId}`, init)
        .then(res => {
            const { status } = res
            if (status === 200) {
                return
            } else if (status >= 400 && status < 500) {
                return res.json()
                    .then(payload => {
                        const { error } = payload
                        throw new Error(error)
                    })
            } else if (status >= 500) {
                throw new Error('server error')
            } else {
                throw new Error('unknown error')
            }
        })
}


export default updateSchedule