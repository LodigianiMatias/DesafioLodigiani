import MongoStore from 'connect-mongo'
import { config } from 'dotenv'
import session from 'express-session'

config({ path: './vars/.env' })

export const mongoSession = session({
  secret: process.env.MONGO_SECRET,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    autoRemove: 'native',
    ttl: 180
  }),
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000
  }
})
