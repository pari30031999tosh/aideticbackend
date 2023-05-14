const { gql } = require('apollo-server-express');

module.exports =  gql`
  type Token {
        token: String!
   }
  type Movie {
    id: ID!
    moviename: String!
    description: String!
    director_name: String!
    Release_Date: Date!
  }
  extend type Query {
    movie(id: ID!): Movie
    listMovies: [Movie!]
  }
  extend type Mutation {
    createMovie(
        moviename: String!
        description: String!
        director_name: String!
        Release_Date: Date! 
    ): Movie!

    updateMovie(
        id:ID!
        moviename: String!
        description: String!
        director_name: String!
        Release_Date: Date!
    ):String!
    
    deleteMovie(id: ID!): String!
  }
  `