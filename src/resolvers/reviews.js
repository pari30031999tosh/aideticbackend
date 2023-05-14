const jwt = require('jsonwebtoken');
const { AuthenticationError, UserInputError } = require('apollo-server');
const {combineResolvers} = require('graphql-resolvers')
const { isAdmin, isAuthenticated} = require('./auhtorization')
const { GraphQLError } = require('graphql');

const bcrypt = require('bcrypt')

const models = require('../models/index.js')

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username } = user;
  return await jwt.sign({ id, email, username, role }, secret, {
    expiresIn,
  });
};

module.exports =  {
  Query: {
    listReviews: async (parent, { id }) => {
     
      return await models.Reviews.findAll({
        where:{
          movie_id: id
        }
      });
    },
    
  },

  Mutation: {

    createReview: async (
      parent,
      { movie_id, user_id, rating, comment },
      {  secret },
    ) => {
       return await models.Reviews.create({
        movie_id: movie_id,
        user_id: user_id,
        rating: rating,
        comment: comment
      });


      
    },

    updateReview: async(
        parent, 
        {id, me_id, movie_id, user_id, rating, comment},
        { secret }) => {

            let review = await models.Reviews.update({
                movie_id: movie_id,
                user_id: user_id,
                rating:  rating,
                comment: comment
            }, {
                where:{
                    id: id,
                    user_id: me_id
                }
            })

            return "updated review"
    },

    deleteReview: async(
        parent, 
        {id, me_id},
        { secret }) => {
            let review = await models.Reviews.destroy({
                where:{
                    id: id,
                    user_id: me_id
                }
            })

            if( review == 0){
                throw new GraphQLError('you can  only delete your reviews, this is not yours', {
                    extensions: { code: '301', data: review },
                }); 
            }

            return "deleted review"
    }

  },
};
