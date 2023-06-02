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
      'mongodb+srv://lodigianimatias97:UqL8e4QrIGRN7r6S@ecommercelodigiani.ugbdtrs.mongodb.net/ecommerceLodigiani?retryWrites=true&w=majority'
    )
    console.log('Plug to Mongo')
  } catch (e) {
    console.log(e)
    process.exit()
  }
}
