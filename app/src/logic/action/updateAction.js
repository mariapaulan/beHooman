import { validators } from 'commons'
const { validateToken, validateId, validateString, validateBoolean, validateNumber } = validators


function updateAction(token, actionId, description, isPublic, requiredTime, requiredBudget) {
    validateToken(token)
    validateId(actionId, 'action id')
    validateString(description, 'description')
    validateBoolean(isPublic, 'is public')
    validateNumber(requiredTime, 'required time')
    validateNumber(requiredBudget, 'required budget')

    return fetch(`http://localhost:8080/api/actions/${actionId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description, public: isPublic, requiredTime, requiredBudget })

    })
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


export default updateAction