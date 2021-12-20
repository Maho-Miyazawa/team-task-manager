const { PrismaClient } = require("@prisma/client");
const { GraphQLScalarType, Kind } = require("graphql");
const prisma = new PrismaClient();

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.getTime();
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  },
});

const resolvers = {
  Date: dateScalar,
  Query: {
    Users: async (parent, args) => {
      const usersData = await prisma.users.findMany({
        where: {
          name: {
            contains: args.name,
          },
        },
      });
      return usersData;
    },
    Notes: async (parent, args) => {
      const notesList = await prisma.notes.findMany({
        where: {
          user_id: args.user_id,
        },
      });

      if (notesList.length > 0) {
        return notesList;
      }
    },
  },
};

module.exports = resolvers;
