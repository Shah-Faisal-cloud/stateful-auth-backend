import express from 'express'
import globalErrorHandler from './middleware/error.middleware.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.use(globalErrorHandler)

export default app