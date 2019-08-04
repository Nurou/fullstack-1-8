const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  })

  response.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  const { body } = request
  const minPassLength = 3

  if (body.password.length < minPassLength) {
    return response.status(400).json({ error: 'the password is too short' })
  }

  try {
    const { body } = request
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash, // actual password not saved to db
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
