import { createHash, isValidPassword } from '../utils.js'

import { CartModel } from '../DAO/models/carts.model.js'
import GitHubStrategy from 'passport-github2'
import { UsersModel } from '../DAO/models/users.model.js'
import { config } from 'dotenv'
import fetch from 'node-fetch'
import local from 'passport-local'
import passport from 'passport'

config({ path: './vars/.env' })

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
          const { email, name, lastname, age, currentCartId } = req.body
          const user = await UsersModel.findOne({ email: username })
          if (user) {
            console.log('User already exists')
            return done(null, false)
          }

          const newUser = {
            email,
            name,
            lastname,
            age,
            currentCartId,
            password: createHash(password)
          }
          const userCreated = await UsersModel.create(newUser)
          return done(null, userCreated)
        } catch (e) {
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
          const res = await fetch('https://api.github.com/user/emails', {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: 'Bearer ' + accesToken,
              'X-Github-Api-Version': '2022-11-28'
            }
          })
          const emails = await res.json()
          const emailDetail = emails.find((email) => email.verified === true)
          if (!emailDetail) {
            return done(new Error('Can not get a valid email for this user'))
          }
          profile.email = emailDetail.email

          const currentCartId = await CartModel.create({})
          const user = await UsersModel.findOne({ email: profile.email })
          if (!user) {
            const newUser = {
              email: profile.email,
              name: profile._json.name || profile._json.login || 'noname',
              lastname: undefined,
              password: 'nopass',
              currentCartId: currentCartId._id
            }
            const userCreated = await UsersModel.create(newUser)
            return done(null, userCreated)
          } else {
            return done(null, user)
          }
        } catch (e) {
          console.log(e)
          return done(e)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser(async (id, done) => {
    const user = await UsersModel.findById(id)
    done(null, user)
  })
}

export default initializePassport
