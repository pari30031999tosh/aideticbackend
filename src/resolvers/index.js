const {GraphQLDateTime} = require('graphql-iso-date')

const userResolver = require('./users');
const movieResolver = require('./movies');
const reviewResolver = require('./reviews')

const customScalarResolver = {
    Date: GraphQLDateTime,
  };

//import userResolver from './user';

module.exports = [customScalarResolver, userResolver, movieResolver, reviewResolver]