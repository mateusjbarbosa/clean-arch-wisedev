import { app } from '@/main/config'
import request from 'supertest'

describe('Content type main middleware', () => {
  it('should return default content type as json', async () => {
    app.get('/tests/content-type', (_, res) => {
      res.send()
    })
    await request(app)
      .get('/tests/content-type')
      .expect(200)
      .expect('content-type', /json/)
  })
})
