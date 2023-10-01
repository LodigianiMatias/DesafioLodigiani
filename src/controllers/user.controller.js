import UserDTO from '../DAO/DTO/user.DTO.js'
import UserService from '../services/UserService.js'

class UserController {
  registrationLocal (req, res) {
    if (!req.user) {
      return res.json({ error: 'Could not register' })
    }
    // req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.name, lastName: req.user.lastName, currentCartId: req.user.currentCartId, role: req.user.role }

    res.status(200).json({ message: 'User registered' })
  }

  loginLocal (req, res) {
    if (!req.user) {
      return res.json({ error: 'Invalid credentials' })
    }
    req.session.user = { _id: req.user._id, email: req.user.email, name: req.user.name, lastname: req.user.lastname, currentCartId: req.user.currentCartId, role: req.user.role }

    res.redirect('/')
  }

  loginGitHub (req, res) {
    req.session.user = req.user
    res.redirect('/')
  }

  currentSession (req, res) {
    const user = req.session.user
    const DTO = new UserDTO(user)
    res.json(DTO)
  }

  deleteSession (req, res) {
    req.session.destroy()
    res.redirect('/login')
  }

  async getAllUsers (req, res) {
    try {
      const users = await UserService.getUsers()
      const usersDto = users.map(user => new UserDTO(user))
      res.status(200).json(usersDto)
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error'
      })
    }
  }
}

export default new UserController()
