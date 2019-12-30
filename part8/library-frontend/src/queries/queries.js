import { gql } from 'apollo-boost'

/**
 * Fragments
 */
const BookDetailsFragment = gql`
  fragment BookDetails on Book {
    title
    author {
      name
      born
    }
    published
    genres
  }
`

/**
 * Queries
 */
export const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  {
    allBooks {
      ...BookDetails
    }
  }
  ${BookDetailsFragment}
`
export const CURRENT_USER = gql`
  {
    me {
      username
      id
      favoriteGenre
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BookDetailsFragment}
`

export const DELETE_BOOK = gql`
  mutation deleteBook($title: String!) {
    deleteBook(title: $title) {
      ...BookDetails
    }
  }
  ${BookDetailsFragment}
`

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

export const NEW_BOOK = gql`
  subscription {
    newBook {
      ...BookDetails
    }
  }
  ${BookDetailsFragment}
`
