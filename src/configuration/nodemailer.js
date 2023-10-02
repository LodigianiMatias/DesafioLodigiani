import config from './config.js'
import nodemailer from 'nodemailer'

const configOptions = {
  service: 'gmail',
  auth: {
    user: config.nodemailer_user,
    pass: config.nodemailer_password
  }
}

export const transporter = nodemailer.createTransport(configOptions)
