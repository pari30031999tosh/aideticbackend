const jwt = require('jsonwebtoken');
const { AuthenticationError, UserInputError } = require('apollo-server');
const { GraphQLError } = require('graphql');
const {combineResolvers} = require('graphql-resolvers')
const { isAdmin, isAuthenticated} = require('./auhtorization')
const models = require('../models/index.js')

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user;
  return await jwt.sign({ id, email, username, role }, secret, {
    expiresIn,
  });
};

module.exports =  {
  Query: {
    movie: async (parent, { id }) => {
      
      return await models.Movies.findOne({
        where:{
          id: id
        }
      });
    },
    listMovies: async (parent, args) => {
      
      return await models.Movies.findAll({
        
      });
    },
  },

  Mutation: {
    createMovie: async (
      parent,
      { moviename, description, director_name, Release_Date },
      {   },
    ) => {

      let movie = await models.Movies.findOne({
        where:{
          moviename: moviename
        }
      })
      
      if (movie) {
        throw new GraphQLError('movie already exists', {
          extensions: { code: '201', data: movie },
        });
      }
      return await models.Movies.create({
        moviename: moviename,
        description: description,
        director_name: director_name,
        Release_Date: Release_Date
      });

      
    },
    
    updateMovie: async (
      parent,
      { id, moviename, description, director_name, Release_Date },
      {  secret },
    ) => {
      let movie = await models.Movies.update({
        moviename: moviename,
        description: description,
        director_name: director_name,
        Release_Date: Release_Date
      },
      {
        where:{
          id: id
        }
      });

      return "successfully updated movie"
      
    } ,
    deleteMovie: async (
      parent,
      { id, me_id },
      {  secret },
    ) => {
      let movie = await models.Movies.destroy(
        {
          where:{
            id: id,
            
          }
        }
      );

      let review = await models.Reviews.destroy({
        where:{
          movie_id: id
        }
      })

      return "successfully deleted movie"
      
    } 
  },
};
