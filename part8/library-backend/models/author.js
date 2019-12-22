const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
    minlength: 4,
    maxlength: 4
  }
})

module.exports = mongoose.model('Author', schema)
