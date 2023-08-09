import { Schema, model } from 'mongoose'

const ticketSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    purchase_datetime: { type: Date, default: Date.now(), required: true },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true, default: 'Anonymous:API' },
    cart: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: 'carts',
            required: true
          },
          _id: false
        }
      ]
    }
  },
  { versionKey: false }
)

export const TicketModel = model('tickets', ticketSchema)
