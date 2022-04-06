const jwt = require('jsonwebtoken')

const { env: { JWT_SECRET } } = process


const verifyTokenAndGetUserId = (req) => {
    const { headers: { authorization } } = req

    const [, token] = authorization.split(' ')

    const payload = jwt.verify(token, JWT_SECRET)

    const { sub: userId } = payload

    return userId
}

const createTokenWithUserId = (userId) => {
    const token = jwt.sign({ sub: userId, exp: Math.floor(Date.now() / 1000) + 60 * 60 }, JWT_SECRET)
    return token
}


module.exports = {
    verifyTokenAndGetUserId,
    createTokenWithUserId
}