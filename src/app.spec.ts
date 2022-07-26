import request from 'supertest'
import app from './app'
import { HTTP_STATUS } from './lib/http'

// app setup
const api = request(app)

// test proper
describe('GET /', () => {
    it('returns the api info', async () => {
        const res = await api.get('/')

        expect(res.status).toEqual(HTTP_STATUS.OK)
        expect(res.body.name).toBeDefined()
        expect(res.body.version).toBeDefined()
        expect(res.body.status).toEqual('up')
    })
})

describe('GET /healthcheck', () => {
    it('returns the api info', async () => {
        const res = await api.get('/healthcheck')

        expect(res.status).toEqual(HTTP_STATUS.OK)
        expect(res.body.status).toEqual('ok')
    })
})
