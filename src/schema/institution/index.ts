import { importSchema } from 'graphql-import';
import Institution from './institution';

export const typeDefs = importSchema('src/schema/user/institution.graphql');

export const resolvers = {
  Query: {
    institutions(_, { input }) {
      const institutions = Institution.find();

      console.log(institutions);
    },
  },
  Mutations: {
    addInstitution(_, { input }) {
      const {  } = input
    },
    removeInstitution(_, { input }) {

    },
    updateInstitution(_, { input }) {

    },
  }
};
