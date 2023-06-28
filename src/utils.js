import bcrypt from 'bcrypt'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public/thumbnails')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

export const uploader = multer({ storage })

// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
export const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

// MONGO

export async function connectMongo () {
  try {
    await mongoose.connect(
      process.env.MONGO_URL
    )
    console.log('Plug to Mongo')
  } catch (e) {
    console.log(e)
    process.exit()
  }
}

// PASSPORT
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const isValidPassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword)
