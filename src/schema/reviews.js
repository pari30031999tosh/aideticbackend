const { gql } = require('apollo-server-express');

module.exports =  gql`
  type Token {
        token: String!
   }
  type Review {
    movie_id: ID!
    rating: Int!
    comment: String!
  }
  extend type Query {
    listReviews(id: ID!): [Review!]
    
  }
  extend type Mutation {
    createReview(
        movie_id: ID!
        user_id: ID!
        rating: Int!
        comment: String!
    ): Review!

    updateReview(
        id: ID!
        me_id: ID!
        movie_id: ID!
        user_id: ID!
        rating: Int!
        comment: String!
    ): String!

    deleteReview(
        id: ID!
        me_id: ID!
    ): String!
  }
  `