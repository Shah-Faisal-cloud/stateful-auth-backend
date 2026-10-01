import session from 'express-session'
import env from './env.js'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'

const sessionMiddleware = () => {
  return session({
    secret: env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    rolling: true,
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      collectionName: 'sessions',
      autoRemove: 'native',
      ttl: 7 * 24 * 60 * 60,
      touchAfter: 24 * 60 * 60
    }),
    cookie: {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 
    }
  })
}

export default sessionMiddleware