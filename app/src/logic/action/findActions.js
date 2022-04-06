import { validators } from 'commons'
const { validateToken, validateString, validateNumber } = validators


function findActions(token, query, requiredTime, requiredBudget) {
    validateToken(token)
    if (!(query === null)) validateString(query, 'query')
    if (!(requiredTime === null)) validateNumber(requiredTime, 'required time')
    if (!(requiredBudget === null)) validateNumber(requiredBudget, 'required budget')

    return fetch(`http://localhost:8080/api/actions/search/?${query !== null ? `query=${query}` : ''}&${requiredTime !== null ? `requiredTime=${requiredTime}` : ''}&${requiredBudget !== null ? `requiredBudget=${requiredBudget}` : ''}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
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


export default findActions