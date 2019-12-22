import express from 'express';
import dotenv from 'dotenv';
import mongoConnection from './db';
import { ApolloServer } from 'apollo-server-express';
import errors from './hooks/errors';

const { typeDefs, resolvers } = require('./hooks/schema');

dotenv.config();
mongoConnection();

const app = express();
const port = process.env.PORT || 3000;

const server = new ApolloServer({
  playground: true,
  introspection: true,
  typeDefs,
  resolvers,
  formatError: (err) => {
    return errors.capture(err);
  },
});

server.applyMiddleware({ app });

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
