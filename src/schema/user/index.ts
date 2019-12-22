import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  input UserInfoInput {
    username: String!
    password: String!
    confirmPassword: String!
    fullName: String!
    email: String!
  }

  input UserInfoLoginInput {
    email: String!
    password: String!
  }

  type UserInfo {
    id: ID
    username: String
    password: String
    token: String
    refreshToken: String
  }

  extend type Query {
    user(id: ID!): UserInfo
    login(input: UserInfoLoginInput): UserInfo
  }

  extend type Mutation {
    register(input: UserInfoInput): UserInfo
  }
`;

export const resolvers = {
  Query: {
    login: (_, { input }, { dataSources }) => dataSources.user.login(input),
    user: (_, { input }, { dataSources }) => dataSources.user.getUser(input),
  },
  Mutation: {
    register: (_, { input }, { dataSources }) =>
      dataSources.user.register(input),
  },
};
