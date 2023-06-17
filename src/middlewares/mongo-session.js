import MongoStore from 'connect-mongo'
import session from 'express-session'

export const mongoSession = session({
  secret: 'un-re-secreto',
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://lodigianimatias97:UqL8e4QrIGRN7r6S@ecommercelodigiani.ugbdtrs.mongodb.net/ecommerceLodigiani?retryWrites=true&w=majority',
    autoRemove: 'native',
    ttl: 60
  }),
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000
  }
})
