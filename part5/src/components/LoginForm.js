import React from 'react'

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      username:
      <input
        type="text"
        value={username}
        name="username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password:
      <input
        type="password"
        value={password}
        name="username"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export default LoginForm
