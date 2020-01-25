import express from 'express';
import dotenv from 'dotenv';
import mongoConnection from './db';
import { ApolloServer } from 'apollo-server-express';
import errors from './hooks/errors';
import dataSources from './data-sources';
import { bucket } from './routes';
import cors from 'cors';

const { typeDefs, resolvers } = require('./hooks/schema');

const a = null;

dotenv.config();
mongoConnection();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use('/', bucket);

const server = new ApolloServer({
  playground: true,
  introspection: true,
  typeDefs,
  resolvers,
  dataSources,
  formatError: (err) => {
    return errors.capture(err);
  },
});

server.applyMiddleware({ app });

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
