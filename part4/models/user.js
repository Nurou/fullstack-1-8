const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// schema definition
const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minlength: 3,
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
})

// formatting returned user
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  },
})

// take validator into use
userSchema.plugin(uniqueValidator)

// define model
const User = mongoose.model('User', userSchema)

module.exports = User
