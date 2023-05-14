const {gql} = require('apollo-server-express');
const userSchema = require('./users');
const reviewSchema = require('./reviews')
const moviesSchema = require('./movies')

const baseSchema =  gql`
scalar Date

type Query {
  _: Boolean
}

type Mutation {
  _: Boolean
}

type Subscription {
  _: Boolean
}
`;
module.exports = [baseSchema, userSchema, reviewSchema, moviesSchema];