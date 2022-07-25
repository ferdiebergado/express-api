import { FieldPacket, ResultSetHeader } from 'mysql2'
import argon from 'argon2'
import db from '../../db'
import { UserAlreadyExistsError, UserNotFoundError } from './auth.errors'
import { generateToken } from '../utils/jwt'

export default {
    register: async (email: string, password: string) => {
        try {
            const sqlCreateUser =
                'INSERT INTO users (email, password) VALUES (?, ?)'

            const hashed = await argon.hash(password)

            const [rows, _]: [ResultSetHeader, FieldPacket[]] = await db.query(
                sqlCreateUser,
                [email, hashed]
            )

            return rows.insertId
        } catch (error: any) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new UserAlreadyExistsError(email)
            } else {
                throw error
            }
        }
    },

    login: async (email: string, password: string) => {
        const sqlFindUserByEmail =
            'SELECT id, email, password FROM users WHERE email = ? LIMIT 1'

        const [users, _]: [any[], FieldPacket[]] = await db.query(
            sqlFindUserByEmail,
            [email]
        )

        if (users.length === 0) throw new UserNotFoundError()

        const user = users[0]

        const passwordsMatch = await argon.verify(user.password, password)

        if (!passwordsMatch) throw new UserNotFoundError()

        const token = await generateToken({ sub: user.id })

        return { token }
    },

    // TODO
    // forgotPassword: async (email: string) => {},

    // TODO
    // resetPassword: async (currentPassword: string, newPassword: string) => {},
}
