import gql from 'graphql-tag';

export const typeDefs = gql`
  type Account {
    bank: String!
    agency: String!
    account: String!
  }

  input AccountInput {
    bank: String!
    agency: String!
    account: String!
  }

  input InstitutionInfoInput {
    name: String!
    about: String
    accounts: [AccountInput]!
  }

  type InstitutionInfo {
    id: ID
    name: String!
    about: String
    accounts: [Account]!
  }

  input InstitutionUpdateInput {
    id: ID
    name: String!
    about: String
    accounts: [AccountInput]!
  }

  extend type Query {
    institutions: [InstitutionInfo]
  }

  extend type Mutation {
    addInstitution(input: InstitutionInfoInput!): InstitutionInfo
    removeInstitution(input: ID!): InstitutionInfo
    updateInstitution(input: InstitutionUpdateInput!): InstitutionInfo
  }
`;

export const resolvers = {
  Query: {
    institutions: (_, __, { dataSources }) =>
      dataSources.institution.getInstitutions(),
  },
  Mutation: {
    addInstitution: (_, { input }, { dataSources }) =>
      dataSources.institution.addInstitution(input),
    removeInstitution: (_, { input }, { dataSources }) =>
      dataSources.institution.removeInstitution(input),
    updateInstitution: (_, { input }, { dataSources }) =>
      dataSources.institution.updateInstitution(input),
  },
};
