const { gql } = require('apollo-server-express');

module.exports =  gql`
  type Token {
        token: String!
   }
  type User {
    id: ID!
    username: String!
    email: String!
    password: String
  }
  extend type Query {
    user(id: ID!): User
    me: User
  }
  extend type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
    ): Token!

    signIn(email: String!, password: String!): Token!
    changePassword(email: String!): String!
    
  }
  `