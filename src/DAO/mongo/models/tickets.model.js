import { Schema, model } from 'mongoose'

const ticketSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    purchase_datetime: { type: Date, default: Date.now(), required: true },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true, default: 'Anonymous:API' },
    products: [
      {
        id: { type: Schema.Types.ObjectId, ref: 'products' },
        quantity: { type: Number, required: true, default: 0 },
        _id: false
      }
    ]
  },
  { versionKey: false }
)

ticketSchema.pre('find', function () {
  this.populate('products.id')
})

ticketSchema.pre('findOne', function () {
  this.populate('products.id')
})

export const TicketModel = model('tickets', ticketSchema)
