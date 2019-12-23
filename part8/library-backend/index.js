const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError
} = require('apollo-server')
const _ = require('lodash')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

// models
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

mongoose.set('useFindAndModify', false)

const MONGODB_URI =
  'mongodb+srv://fullstack:fullstack@cluster0-c0uls.mongodb.net/test?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: String!
    bookCount: Int
    born: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addAuthor(name: String!, born: Int!): Author
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const genreProvided = args.genre
      const authorProvided = args.author

      const books = await Book.find({})

      const filteredByGenre = books.filter(book =>
        book.genres.includes(args.genre)
      )
      const filteredByAuthor = books.filter(
        book => book.author === authorProvided
      )
      const filteredByAuthorAndGenre = books.filter(
        book =>
          book.author === authorProvided && book.genres.includes(genreProvided)
      )
      // TODO: deal with queries with args
      if (genreProvided && !authorProvided) return filteredByGenre
      // if (!genreProvided && authorProvided) return filteredByAuthor
      // if (genreProvided && authorProvided) return filteredByAuthorAndGenre

      return books
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const books = await Book.find({})
      return authors.map(a => ({
        name: a.name,
        born: a.born,
        bookCount: books.filter(b => b.author.toString() === a._id.toString())
          .length
      }))
    },
    me: (root, args, context) => {
      console.log(context.currentUser)
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      // short book titles
      const bookExists = await Book.findOne({ title: args.title })
      if (bookExists) {
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.title
        })
      }

      const book = new Book({ ...args })

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      return book
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      if (!args.name || !args.setBornTo) {
        throw new UserInputError('arguments missing', {
          invalidArgs: args
        })
      }
      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { $set: { born: args.setBornTo } },
        { new: true },
        err => {
          if (err) {
            throw new UserInputError(error.message, {
              invalidArgs: args
            })
          }
        }
      )
      return author
    },
    createUser: (root, args) => {
      const user = new User({ ...args })
      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secred') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      // return jwt token if user-pass pair matches
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // is there a token?
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
