const { ApolloServer } = require("apollo-server");
const { ApolloServerPluginLandingPageDisabled } = require("apollo-server-core");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageDisabled()],
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server is ready at ${url}`);
});
