import 'dotenv/config'
import mysql from 'mysql2'

const config = {
    db: {
        host: process.env.MYSQL_HOST || 'localhost',
        port: process.env.MYSQL_PORT || 3306,
        user: process.env.MYSQL_USER || 'user',
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE || 'test',
        supportBigNumbers: true,
    } as mysql.PoolOptions,

    validation: {
        auth: {
            password: {
                minLength: 8,
                maxLength: 100,
            },
        },
    },

    cors: {
        origin: '*',
    },

    jwt: {
        secret: process.env.KEY || 'shhhhh',
        expiration: '30m',
    },
}

export default config
