import { ROLES } from '../DAO/models/users.model.js'

export const isAdmin = (req, res, next) => {
  if (req.session.role !== ROLES.ADMIN) {
    return res.status(403).render('errorPermissions', { name: 'Error Permissions' })
  }
  next()
}
