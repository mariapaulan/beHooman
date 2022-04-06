import { validators } from 'commons'
const { validateString, validateDate, validateToken, validateId } = validators


function createSchedule(token, actionId, date, repeat) {
    validateToken(token)
    validateId(actionId, 'action id')
    validateDate(date, 'date')
    validateString(repeat, 'repeat')

    return fetch(`http://localhost:8080/api/schedules/${actionId}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date, repeat })
    })
        .then(res => {
            const { status } = res

            if (status === 200) {
                return res.json()
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


export default createSchedule