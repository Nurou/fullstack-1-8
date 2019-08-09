const jwt = require('jsonwebtoken') // need for token-based auth
const bcrypt = require('bcrypt') // need it compare password hashes
const User = require('../models/user')
const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response) => {
  const { body } = request

  // get login user from db
  const user = await User.findOne({
    username: body.username,
  })
  // validate password by comparing returned user's password
  // with the sent password (both hashed)
  const isPasswordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

  console.log(isPasswordCorrect)
  // if user or pass incorrect -> respond 401 (unauthorized) + error
  if (!(user && isPasswordCorrect)) {
    response.status(401).json({
      error: 'invalid username or password',
    })
  }

  // define user that receives token
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  // create token --> Digital signature, ensures that only parties who know
  // the secret can generate a valid token
  const token = jwt.sign(userForToken, process.env.SECRET)

  // send back user & token
  response
    .status(200) //
    .send({
      token,
      username: user.username,
      name: user.name,
    })
})

module.exports = loginRouter
