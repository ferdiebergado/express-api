import { FieldPacket, RowDataPacket } from 'mysql2'
import db from '../../db'
import { UserNotFoundError } from '../auth/auth.errors'

export interface User {
    id: number
    email: string
}

export const findUserById = async (id: number) => {
    const sqlFindUserById = 'SELECT id, email FROM users WHERE id = ? LIMIT 1'

    const [rows, _]: [RowDataPacket[], FieldPacket[]] = await db.query(
        sqlFindUserById,
        [id]
    )

    if (rows.length === 0) throw new UserNotFoundError()

    return rows[0]
}
