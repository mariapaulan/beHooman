import { validators } from 'commons'
const { validateToken, validateId } = validators


function toggleFavorite(token, actionId) {
    validateToken(token)
    validateId(actionId, 'action id')

    return fetch(`http://localhost:8080/api/actions/${actionId}/favorites`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`
        }
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


export default toggleFavorite