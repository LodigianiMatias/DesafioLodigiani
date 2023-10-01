import userManagerMongo from '../DAO/mongo/userManager.mongo.js'

export const isLoguedIn = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/login')
  }
  userManagerMongo.updateUser({
    lastInteraction: new Date()
  })
  next()
}
