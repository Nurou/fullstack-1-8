const { ApolloServer, gql, UserInputError } = require('apollo-server')
const _ = require('lodash')
const mongoose = require('mongoose')

const Book = require('./models/book')
const Author = require('./models/author')

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
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
      // if (genreProvided && !authorProvided) return filteredByGenre
      // if (!genreProvided && authorProvided) return filteredByAuthor
      // if (genreProvided && authorProvided) return filteredByAuthorAndGenre

      return books
    },
    // allAuthors: () =>
    //   authors.map(author => ({
    //     ...author,
    //     bookCount: books.filter(book => book.author === author.name).length
    //   }))
    allAuthors: async () => {
      const authors = await Author.find({})
      const books = await Book.find({})
      return authors.map(a => ({
        name: a.name,
        born: a.born,
        bookCount: books.filter(b => b.author.toString() === a._id.toString())
          .length
      }))
    }
  },
  Mutation: {
    addBook: async (root, args) => {
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
    editAuthor: async (root, args) => {
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
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
