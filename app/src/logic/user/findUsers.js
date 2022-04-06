import { validators } from 'commons'
const { validateToken, validateString } = validators


function findUsers(token, query = '') {
    validateToken(token)
    if (query) validateString(query, 'query')

    return fetch(`http://localhost:8080/api/users/search?query=${query}`, {
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


export default findUsers