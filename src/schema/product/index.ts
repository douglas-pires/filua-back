import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Product {
    id: ID
    name: String
    image: String
    price: String
    categoryTree: [String]
    partnerUrl: String
    partner: String
  }

  input ProductInput {
    name: String
    image: String
    price: String
    categoryTree: [String]
    partnerUrl: String
    partner: String
  }

  extend type Query {
    products(first: Int, after: ID): [Product]
  }

  extend type Mutation {
    addProduct(input: ProductInput!): Product
    removeProduct(input: ID!): Product
    updateProduct(input: ProductInput!): Product
  }
`;

export const resolvers = {
  Query: {
    products: (_, { first, after }, { dataSources }) =>
      dataSources.product.getProducts({ first, after }),
  },
  Mutation: {
    addProduct: (_, { input }, { dataSources }) =>
      dataSources.product.addProduct(input),
    removeProduct: (_, { input }, { dataSources }) =>
      dataSources.product.removeProduct(input),
    updateProduct: (_, { input }, { dataSources }) =>
      dataSources.product.updateProduct(input),
  },
};
