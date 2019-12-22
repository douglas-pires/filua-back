module.exports = ['index', 'institution', 'product', 'user'].reduce(
  (result, item) => {
    const { resolvers, typeDefs } = require('../schema/' + item);
    if (resolvers) result.resolvers.push(resolvers);
    if (typeDefs) result.typeDefs.push(typeDefs);
    return result;
  },
  {
    typeDefs: [],
    resolvers: [],
  },
);
