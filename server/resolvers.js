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
    AllUsers: async (parent, args) => {
      const usersData = await prisma.users.findMany({
        where: {
          name: {
            contains: args.name,
          },
        },
      });
      return usersData;
    },
    User: async (parent, args) => {
      const userData = await prisma.users.findUnique({
        where: {
          id: args.id,
        },
        include: {
          tasks: {
            include: {
              priority: {
                select: {
                  id: true,
                  level: true,
                },
              },
              progress: {
                select: {
                  id: true,
                  level: true,
                },
              },
            },
          },
        },
      });

      return userData;
    },
    Tasks: async (parent, args) => {
      const tasksList = await prisma.tasks.findMany({
        where: {
          user_id: args.user_id,
        },
        include: {
          user: true,
        },
      });

      return tasksList;
    },
    OneTask: async (parent, args) => {
      const task = await prisma.tasks.findUnique({
        where: {
          id: args.taskId,
        },
      });
      return task;
    },
    CollateUserId: async (parent, args) => {
      const profile = await prisma.users.findUnique({
        where: {
          id: args.id,
        },
        include: {
          team: true,
        },
      });
      return profile;
    },
    Member: async (parent, args) => {
      const member = await prisma.users.findMany({
        where: {
          team_id: args.teamId,
        },
        include: {
          team: true,
        },
      });
      return member;
    },
  },

  Mutation: {
    createNewTask: async (parent, args) => {
      const newTask = await prisma.tasks.create({
        data: {
          user_id: args.user_id,
          task: args.task,
          priority_id: args.priority_id,
        },
      });
      return newTask;
    },
    updateProgress: async (parent, args) => {
      const task = await prisma.tasks.update({
        where: {
          id: args.taskId,
        },
        data: {
          progress_id: args.afterProgressNum,
        },
      });
      return task;
    },
    deleteTask: async (parent, args) => {
      const task = await prisma.tasks.update({
        where: {
          id: args.taskId,
        },
        data: {
          is_deleted: true,
        },
      });
      return task;
    },
    updateTask: async (parent, args) => {
      const task = await prisma.tasks.update({
        where: {
          id: args.taskId,
        },
        data: {
          task: args.task,
          priority_id: args.priority_id,
        },
      });
      return task;
    },
    createNewUser: async (parent, args) => {
      const newUser = await prisma.users.create({
        data: {
          id: args.id,
          team_id: args.teamId,
          name: args.name,
        },
      });
      return newUser;
    },
  },
};

module.exports = resolvers;
