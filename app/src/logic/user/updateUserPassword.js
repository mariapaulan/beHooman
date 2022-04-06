import { validators } from 'commons'
const { validateToken, validatePassword } = validators


function updateUserPassword(token, currentPassword, newPassword, confirmPassword) {
    validateToken(token)
    validatePassword(currentPassword, 'old password')
    validatePassword(newPassword, 'new password')
    validatePassword(confirmPassword, 'confirmed password')

    if (newPassword !== confirmPassword) throw new Error('retyped password doesn\'t match password')

    return fetch('http://localhost:8080/api/users/change-password', {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ currentPassword, newPassword })

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


export default updateUserPassword