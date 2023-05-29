import { Schema, model } from 'mongoose'

const cartSchema = new Schema({
  id: { type: String, required: true },
  quantity: { type: Number, required: true, max: 3 }
})

const schema = new Schema({
  products: { type: [cartSchema] }
})

export const UserModel = model('carts', schema)
