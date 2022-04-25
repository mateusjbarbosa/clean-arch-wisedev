import { app } from '@/main/config'
import request from 'supertest'

describe('CORS main middleware', () => {
  it('should enable CORS', async () => {
    app.get('/tests/cors', (_, res) => {
      res.send()
    })

    await request(app)
      .get('/tests/cors')
      .expect(200)
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
