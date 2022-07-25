import jwt from 'jsonwebtoken'
import config from '../../config'

const { secret, expiration } = config.jwt

export const generateToken = (
    payload: Record<string, unknown>
): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, { expiresIn: expiration }, (err, token) => {
            if (err) reject(err)

            resolve(token)
        })
    })
}

export const verifyToken = (token: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) reject(err)

            if (decoded) resolve(decoded.sub as string)
        })
    })
}
