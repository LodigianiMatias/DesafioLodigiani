import { ROLES } from '../DAO/mongo/models/users.model.js'

export const isAdmin = (req, res, next) => {
  const session = req.session.user
  if (session.role !== ROLES.ADMIN) {
    return res.status(403).render('errorPermissions', { name: 'Error Permissions' })
  }
  next()
}

export const isUser = (req, res, next) => {
  const session = req.session.user
  if (session.role !== ROLES.USER) {
    return res.status(403).render('errorPermissions', { name: 'Error Permissions' })
  }
  next()
}
