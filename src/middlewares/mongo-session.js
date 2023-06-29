import 'dotenv/config'

import MongoStore from 'connect-mongo'
import session from 'express-session'

export const mongoSession = session({
  secret: process.env.SESSION_SECRET,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    autoRemove: 'native',
    ttl: 60
  }),
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000
  }
})
