import express from 'express'
import setupMiddlewares from './middlewares/setup'

const app = express()
setupMiddlewares(app)

export { app }
