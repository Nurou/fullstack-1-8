const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
  PubSub
} = require('apollo-server')
const _ = require('lodash')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

// models
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

/**
 * Docs: PubSub is a class that exposes a simple publish and subscribe API.
 */
const pubsub = new PubSub()

/**
 * Mongoose Setup
 */
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

/**
 * Type Definitions
 */

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

  type Subscription {
    newBook: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const genreProvided = args.genre
      const authorProvided = args.author

      // db queries
      const books = await Book.find({}).populate('author')

      if (authorProvided) {
        const author = await Author.findOne({ name: authorProvided })

        // author & genre ✔
        if (genreProvided) {
          return books.filter(
            book =>
              book.author.name === authorProvided &&
              book.genres.includes(genreProvided)
          )
        }

        // only author ✔
        return books.filter(book => book.author.name === authorProvided)
      }

      // only genre ✔
      if (genreProvided)
        return books.filter(book => book.genres.includes(args.genre))

      // no filter ✔
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

      // copy the book
      const book = new Book({ ...args })

      // check if the author is in db
      const authorExists = await Author.findOne({ name: args.author })

      if (!authorExists) {
        // create author and save them in db
        const author = new Author({ name: args.author })
        const returnedAuthor = await author.save()
        // now we have the authors id
        // we can save the book along with the author id
        console.log(`returned author: ${returnedAuthor}`)
        book.author = returnedAuthor._id
      } else {
        book.author = authorExists._id
      }

      let savedBook = await book.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      })

      /**
       * publish command received by PubSub which pushes
       * it to GraphQL execution engine
       * a notification about the operation (book addition) is sent
       * to all subscribers
       */

      /**
       * @param first: triggerName - which subscription do we want to trigger?
       * @param second: payload - object
       */

      savedBook = savedBook.populate('author').execPopulate()

      // when the mutation occurs, the data is published to subscribers
      pubsub.publish('NEW_BOOK', { newBook: savedBook })

      return savedBook
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
      const user = new User({ username: args.username })

      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secred') {
        throw new UserInputError('Wrong Credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      // return jwt token if user-pass pair matches
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },

  Subscription: {
    /**
     * the bookAdded resolver returns an iterator object to all subscribers
     */
    newBook: {
      subscribe: () => pubsub.asyncIterator(['NEW_BOOK'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // is there a request? if yes, get token
    const auth = req ? req.headers.authorization : null
    // if token is of valid format, decode it & find user by it
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      // currentUser now accessible in resolvers through context
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
