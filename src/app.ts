import express from 'express'
import cors from 'cors'
import authRouter from './lib/auth/auth.router'
import { healthChecker } from './lib/healthcheck'
import {
    errorHandler,
    notFoundHandler,
    requestLogger,
    homeHandler,
} from './lib/middlewares'
import config from './config'

const app = express()

// express settings
app.disable('x-powered-by')

// middlewares
app.use(requestLogger)
app.use(
    cors({
        origin: config.cors.origin,
    })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app routes
app.get('/', homeHandler)
app.use('/auth', authRouter)
app.get('/healthcheck', healthChecker)

// error handlers
app.all('*', notFoundHandler)
app.use(errorHandler)

export default app
