import { UsersModel } from '../DAO/mongo/models/users.model.js'
import bcrypt from 'bcrypt'

class UserService {
  async getUsers () {
    try {
      return await UsersModel.find({}).lean()
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async getUserById (id) {
    return await UsersModel.findOne({ _id: id }).orFail(new Error(`User not found by id: ${id}`)).lean()
  }

  async addUser (user) {
    const data = { ...user, password: bcrypt.hashSync(user.password, 10) }
    return await UsersModel.create(data)
  }

  async getUserByEmail (email) {
    try {
      return await UsersModel.findOne({ email }).lean()
    } catch (err) {
      throw new Error(err.message)
    }
  }
}

export default new UserService()
