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

  async deleteInactiveUsers () {
    await userManager.deleteAllInactiveUsers()
  }
}

export default new UserService()
