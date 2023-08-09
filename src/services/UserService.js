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
}

export default new UserService()
