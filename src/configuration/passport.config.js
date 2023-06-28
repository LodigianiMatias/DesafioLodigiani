import 'dotenv/config'

import { createHash, isValidPassword } from '../utils.js'

import GitHubStrategy from 'passport-github2'
import { UsersModel } from '../DAO/models/users.model.js'
import local from 'passport-local'
import passport from 'passport'

const LocalStrategy = local.Strategy

const initializePassport = () => {
  // LOCAL STRATEGY
  passport.use(
    'login',
    new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
      try {
        const user = await UsersModel.findOne({ email: username })
        if (!user) {
          console.log('User Not Found with username (email) ' + username)
          return done(null, false)
        }
        if (!isValidPassword(password, user.password)) {
          console.log('Invalid Password')
          return done(null, false)
        }

        return done(null, user)
      } catch (err) {
        return done(err)
      }
    })
  )

  passport.use(
    'register',
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: 'email'
      },
      async (req, username, password, done) => {
        try {
          const { email, name, lastname } = req.body
          const user = await UsersModel.findOne({ email: username })
          if (user) {
            console.log('User already exists')
            return done(null, false)
          }

          const newUser = {
            email,
            name,
            lastname,
            password: createHash(password)
          }
          const userCreated = await UsersModel.create(newUser)
          console.log('User Registration succesful')
          return done(null, userCreated)
        } catch (e) {
          console.log('Error in register')
          console.log(e)
          return done(e)
        }
      }
    )
  )

  // GITHUB STRATEGY
  passport.use(
    'github',
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
      },
      async (accesToken, _, profile, done) => {
        try {
          const user = await UsersModel.findOne({ email: profile.email })
          if (!user) {
            const newUser = {
              email: profile.email,
              firstName: profile._json.name || profile._json.login || 'noname',
              lastName: 'nolast',
              password: 'nopass'
            }
            const userCreated = await UsersModel.create(newUser)
            console.log('User Registration succesful')
            return done(null, userCreated)
          } else {
            console.log('User already exists')
            return done(null, user)
          }
        } catch (e) {
          console.log('Error en auth github')
          console.log(e)
          return done(e)
        }
      }
    )
  )

  passport.serializeUser(async function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(async function (id, done) {
    await UsersModel.findById(id, function (err, user) {
      done(err, user)
    })
  })
}

export default initializePassport
