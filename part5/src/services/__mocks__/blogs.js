const user = {
  username: 'tester',
  token: '1231231214',
  name: 'Donald Tester',
}

const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: user,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: user,
  },
]

let token = null

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = newToken => {
  token = newToken
}

export default { getAll, setToken }
