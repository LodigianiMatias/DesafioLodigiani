import { ROLES } from '../DAO/mongo/models/users.model.js'

export const isAdmin = (req, res, next) => {
  const session = req.user
  if (session.role !== ROLES.ADMIN) {
    return res.status(403).render('errorPermissions', { name: 'Error Permissions' })
  }
  next()
}

export const hasRoles = (roles) => {
  return (req, res, next) => {
    const session = req.user
    if (!roles.includes(session.role)) {
      return res.status(403).render('errorPermissions', { name: 'Error Permissions' })
    }
    next()
  }
}

export const isUser = (req, res, next) => {
  const session = req.user
  if (session.role !== ROLES.USER) {
    return res.status(403).render('errorPermissions', { name: 'Error Permissions' })
  }
  next()
}
