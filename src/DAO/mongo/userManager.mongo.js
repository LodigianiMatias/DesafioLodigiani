import { ROLES, UsersModel } from './models/users.model.js'

import bcrypt from 'bcrypt'

class UserManager {
  async getUsers () {
    try {
      return await UsersModel.find({}).lean()
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async getUserById (id) {
    try {
      return await UsersModel.findOne({ _id: id }).orFail(new Error(`User not found by id: ${id}`)).lean()
    } catch (err) {
      console.log(err.message)
    }
  }

  async addUser (user) {
    try {
      const data = { ...user, password: bcrypt.hashSync(user.password, 10) }
      return await UsersModel.create(data)
    } catch (err) {
      console.log(err.message)
    }
  }

  async getUserByEmail (email) {
    try {
      return await UsersModel.findOne({ email }).lean()
    } catch (err) {
      console.log(err.message)
    }
  }

  async updateUser (id, userData) {
    try {
      const updated = await UsersModel.updateOne({ _id: id }, userData, { new: true })
      return updated
    } catch (error) {
      console.log(error.message)
    }
  }

  async deleteAllInactiveUsers () {
    try {
      const twoDaysAgo = new Date(Date.now() - 2) // 2 minutos atrás
      const usersToDelete = await UsersModel.find({
        lastConnection: {
          $lte: twoDaysAgo // LastInteraction menor o igual a 2 dias atrás
        },
        role: {
          $ne: ROLES.ADMIN // role no es igual a 'admin'
        }
      })
      const emails = usersToDelete.map(user => user.email)
      await UsersModel.deleteMany({
        _id: { $in: usersToDelete.map((user) => user._id) }
      })
      return emails
    } catch (error) {
      console.log(error.message)
    }
  }
}

export default new UserManager()
