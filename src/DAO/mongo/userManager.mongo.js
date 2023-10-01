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
      const today = new Date()
      const usersDeleted = await UsersModel
        .deleteMany({}, { returnDocument: true })
        .where('lastInteraction')
        .lte(today.setDate(today.getDate() - 2))
      console.log({ usersDeleted })
      // TODO: SEND EMAIL TO USERS DELETED
    } catch (error) {
      console.log(error.message)
    }
  }
}

export default new UserManager()
