// COMMENT MODEL
const mongoose = require('mongoose')

// deal with deprecation warning
mongoose.set('useFindAndModify', false)

const commentSchema = mongoose.Schema({
  content: String,
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  },
})

// format returned object
commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // prettier id
    returnedObject.id = returnedObject._id.toString()
    // get rid of ugly id & version
    delete returnedObject._id
    delete returnedObject.__v
  },
})

// create model
const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
