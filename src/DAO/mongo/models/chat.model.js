import { Schema, model } from 'mongoose'

const chatSchema = new Schema({
  user: { type: String, required: true, max: 100 },
  message: { type: String, required: true, max: 300 }
})

export const MsgModel = model('msgs', chatSchema)
