import { Schema, model } from 'mongoose'

import mongoosePaginate from 'mongoose-paginate-v2'

const productSchema = new Schema({
  title: { type: String, required: true, max: 100 },
  desc: { type: String, required: true, max: 300 },
  price: { type: Number, required: true, max: 1000000000000 },
  thumbnails: { type: String },
  code: { type: Number, required: true, max: 1000000000000, unique: true },
  stock: { type: Number, required: true, max: 1000000000000 },
  status: { type: Boolean, default: true }

}, {
  strict: true
})

productSchema.plugin(mongoosePaginate)
export const ProductModel = model('products', productSchema)
