const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");
const path = require("path");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  app.use(express.static(path.resolve(__dirname, "..", "build")));

  app.use("/signup", (_, res) => {
    res.sendFile(path.resolve(__dirname, "../build/index.html"));
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: true,
  });

  const PORT = process.env.PORT || 4000;

  await server.start();
  server.applyMiddleware({ app });

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀  Server ready at ${PORT}`);
}

startApolloServer();
