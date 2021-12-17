const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const usersSeeding = require("./users");
const notesSeeding = require("./notes");

usersSeeding()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

notesSeeding()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
