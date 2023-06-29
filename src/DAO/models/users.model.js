import mongoose from 'mongoose'

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  USER_PREMIUM: 'user_premium'
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/gm.test(v)
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: ROLES.USER,
    enum: [ROLES.USER, ROLES.ADMIN, ROLES.USER_PREMIUM]
  },
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String
  },
  currentCartId: {
    type: String,
    required: false
  }
}, { versionKey: false, timestamps: true })

export const UsersModel = mongoose.model('Users', userSchema)
