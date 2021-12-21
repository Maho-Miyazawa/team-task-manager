const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const usersSeeding = require("./users");
const tasksSeeding = require("./tasks");
const teamsSeeding = require("./teams");
const progressSeeding = require("./progress");
const prioritiesSeeding = require("./priorities");

usersSeeding()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

tasksSeeding()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

teamsSeeding()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

progressSeeding()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

prioritiesSeeding()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
