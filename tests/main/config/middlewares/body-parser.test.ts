import { app } from '@/main/config'
import request from 'supertest'

describe('body-parser main middlaware', () => {
  it('should parse body as json', async () => {
    const body = {
      name: 'John Doe'
    }

    app.post('/tests/body-parser', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post('/tests/body-parser')
      .send(body)
      .expect(200)
      .expect(body)
  })
})
