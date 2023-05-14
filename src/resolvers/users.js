const jwt = require('jsonwebtoken');
const { AuthenticationError, UserInputError } = require('apollo-server');
const {combineResolvers} = require('graphql-resolvers')
const { isAdmin, isAuthenticated} = require('./auhtorization')
const bcrypt = require('bcrypt')

const models = require('../models/index.js')

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username } = user;
  
  return await jwt.sign({ id, email, username }, secret, {
    expiresIn,
  });
};

module.exports =  {
  Query: {
    user: async (parent, { id }) => {
     
      return await models.Users.findOne({
        where:{
          id: id
        }
      });
    },
    me: async (parent, args, {  me }) => {
      if (!me) {
        return null;
      }
      return await models.Users.findOne({
        where:{
          id: me.id
        }
      });
    },
  },

  Mutation: {
    signUp: async (
      parent,
      { username, email, password },
      { secret },
    ) => {
      console.log("password", password)
      const salt = await bcrypt.genSalt(8);
      password = await bcrypt.hash(password, salt);
      const user = await models.Users.create({
        username,
        email,
        password,
      });

      return { token: createToken(user, secret, '30m') };
    },

    signIn: async (
      parent,
      { email, password },
      { secret  },
    ) => {
      const user = await models.Users.findOne({
        where:{
          email: email
        }
      });

      if (!user) {
        throw new UserInputError(
          'No user found with this login credentials.',
        );
      }

      const isValid = await bcrypt.compare(password, user.password);
      
      if (!isValid) {
        throw new AuthenticationError('Invalid password.');
      }

      return { token: createToken(user, secret, '30m') };
    },

    changePassword:
      async (parent, { email }) => {
        let user = await models.Users.findOne(
          {
            where:{
              email: email
            }
          }
        );

        return "password updated"
      },

    
  },
};
