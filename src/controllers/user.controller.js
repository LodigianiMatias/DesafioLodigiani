import UserDTO from '../DAO/DTO/user.DTO.js'

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
}

export default new UserController()
