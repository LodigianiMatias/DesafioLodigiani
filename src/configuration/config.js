import dotenv from 'dotenv'

dotenv.config({ path: './vars/.env' })

export default {
  persistence: process.env.PERSISTENCE
}
