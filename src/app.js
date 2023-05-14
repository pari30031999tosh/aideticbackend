require('dotenv').config() 
const cors = require('cors');
const jwt =require('jsonwebtoken');
const  express = require('express');

const schema = require('./schema/index');
const resolvers = require('./resolvers/index');
const {models} = require('./models/index.js');

const {
  ApolloServer
} = require('apollo-server-express');



const app = express();

const getMe = async req => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};

async function serverstart(){
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers,
        context: async ({ req, connection }) => {
          const me = await getMe(req);
          return {
            models,
            me,
            secret: process.env.SECRET,
          };
      },
      });
      await server.start()
      server.applyMiddleware({ app, path: '/graphql' });
}

serverstart()

const port = process.env.PORT || 4000;



  app.listen({ port }, () => {
    console.log(`Apollo Server on http://localhost:${port}/graphql`);
  });
