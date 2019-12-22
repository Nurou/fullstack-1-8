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
      // spits out an array of objects with an id and count, with the id being the author's id
      // const authorIds = authors.map(a => a._id)
      // const authorBookCounts = await Book.aggregate([
      //   {
      //     /* $match is a filter */
      //     $match: {
      //       author: {
      //         // if they're strings instead of objectids, this will break:
      //         $in: authorIds
      //       }
      //     }
      //   },
      //   {
      //     /* how we want to group the information together */
      //     $group: {
      //       // _id field has to be unique - we choose a field from the object
      //       _id: '$author',
      //       // counts the number of entries in the book collection
      //       // that have the same author
      //       count: { $sum: 1 }
      //     }
      //   }
      // ])

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
    editAuthor: (root, args) => {
      const author = authors.find(author => author.name === args.name)
      // TODO: refactor to throw error
      if (!author) {
        return null
      }
      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map(author =>
        author.name === args.name ? updatedAuthor : author
      )
      return updatedAuthor
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
