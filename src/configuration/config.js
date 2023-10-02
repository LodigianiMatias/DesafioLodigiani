import dotenv from 'dotenv'

dotenv.config({ path: './vars/.env' })

export default {
  persistence: process.env.PERSISTENCE,
  nodemailer_user: process.env.NODEMAILER_USER,
  nodemailer_password: process.env.NODEMAILER_PASSWORD
}
