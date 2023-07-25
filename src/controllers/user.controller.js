class UserController {
  registrationLocal (req, res) {
    if (!req.user) {
      return res.json({ error: 'Could not register' })
    }
    req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, currentCartId: req.user.currentCartId }

    res.status(200).json({ message: 'User registered' })
  }

  loginLocal (req, res) {
    if (!req.user) {
      return res.json({ error: 'Invalid credentials' })
    }
    req.session.user = { _id: req.user._id, email: req.user.email, name: req.user.name, lastname: req.user.lastname, currentCartId: req.user.currentCartId }

    res.redirect('/')
  }

  loginGitHub (req, res) {
    req.session.user = req.user
    res.redirect('/')
  }

  currentSession (req, res) {
    const user = req.session
    res.json(user)
  }

  deleteSession (req, res) {
    req.session.destroy()
    res.redirect('/login')
  }
}

export default new UserController()
