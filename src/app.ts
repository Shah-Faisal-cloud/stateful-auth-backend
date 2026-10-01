import express from 'express'
import globalErrorHandler from './middleware/error.middleware.js';
import sessionMiddleware from './config/session.js';
import authRouter from './routes/auth.route.js';

const createApp = () => {
  const app = express();
  app.use(express.json())
  app.use(sessionMiddleware())
  
  app.get('/', (req, res) => {
    res.send('Hello, World!')
  })

  app.use('/api/auth', authRouter)
  
  app.use(globalErrorHandler)

  return app
}

export default createApp