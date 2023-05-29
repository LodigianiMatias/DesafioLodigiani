import { Schema, model } from 'mongoose'

const schema = new Schema({
  title: { type: String, required: true, max: 100 },
  desc: { type: String, required: true, max: 300 },
  price: { type: Number, required: true, max: 100 },
  code: { type: Number, required: true, max: 8 },
  stock: { type: Number, required: true, max: 4 },
  thumbnails: { type: String, required: true },
  status: { type: Boolean, required: false }
})

export const UserModel = model('products', schema)
