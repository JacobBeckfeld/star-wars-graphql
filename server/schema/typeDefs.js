const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }

    type Book {
        _id: ID!
        authors: [String]
        description: String!
        bookId: String!
        image: String!
        link: String!
        title: String!
    }

    type Auth {
        token: ID!
        user: User
        
    }

    type Query {
        user: [User]
    }
    
    type Mutation {
        createUser(username: String!, email: String!, password: String!): User
        login(email: String, password: String!): Auth
        removeBook(_id: Int): User
    }
`

module.exports = typeDefs