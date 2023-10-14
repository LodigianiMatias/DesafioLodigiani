import { logger } from '../utils/logger.utils.js'
import userManager from '../DAO/mongo/userManager.mongo.js'

class UserService {
  async getUsers () {
    return await userManager.getUsers()
  }

  async getUserById (id) {
    return await userManager.getUserById(id)
  }

  async addUser (user) {
    return await userManager.addUser(user)
  }

  async getUserByEmail (email) {
    return await userManager.getUserByEmail(email)
  }

  async updateUser (id, data) {
    try {
      return await userManager.updateUser(id, data)
    } catch (error) {
      logger.error(error.message)
      throw error
    }
  }

  async deleteInactiveUsers () {
    try {
      return await userManager.deleteAllInactiveUsers()
    } catch (error) {
      logger.error(error.message)
      throw error
    }
  }
}

export default new UserService()
