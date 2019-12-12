const { ApolloServer, gql, UserInputError } = require('apollo-server')
const uuid = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e'
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e'
  }
]

/*
 * It would be more sensible to associate book and the author by saving
 * the author id instead of the name to the book.
 * For simplicity we however save the author name.
 */

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution']
  }
]

const typeDefs = gql`
  type Book {
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: String!
    bookCount: Int!
    born: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
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
    bookCount: () => {
      return books.length
    },
    authorCount: () => {
      return authors.length
    },
    allBooks: (root, args) => {
      const genreProvided = args.genre
      const authorProvided = args.author

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

      if (genreProvided && !authorProvided) return filteredByGenre
      if (!genreProvided && authorProvided) return filteredByAuthor
      if (genreProvided && authorProvided) return filteredByAuthorAndGenre

      return books
    },
    allAuthors: () => {
      authorsWithBookCount = [...authors].map(author => ({
        ...author,
        bookCount: 0
      }))

      books.forEach(book => {
        authorsWithBookCount.map(author =>
          author.name === book.author ? author.bookCount++ : author
        )
      })

      return authorsWithBookCount
    }
  },
  Mutation: {
    addBook: (root, args) => {
      if (books.find(book => book.title === args.title)) {
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.title
        })
      }

      const book = { ...args, id: uuid() }
      const author = book.author
      if (!authors.find(author => author.name === author)) {
        authors.push({ name: author, born: null, id: uuid() })
      }
      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find(author => author.name === args.name)
      if (!author) {
        // throw new UserInputError('Author does not exist!', {
        //   invalidArgs: args.name
        // })
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
