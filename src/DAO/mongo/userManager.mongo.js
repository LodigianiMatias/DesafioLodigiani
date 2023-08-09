import { UsersModel } from './models/users.model.js'
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
}

export default new UserManager()
