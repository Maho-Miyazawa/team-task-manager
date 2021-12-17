const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const usersSeeding = require("./users");

usersSeeding()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
