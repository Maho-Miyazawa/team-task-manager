const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const usersSeeding = require("./users");
const tasksSeeding = require("./tasks");
const teamsSeeding = require("./teams");
const progressSeeding = require("./progress");
const prioritiesSeeding = require("./priorities");

async function seeding() {
  await teamsSeeding()
    .catch((err) => {
      throw err;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  await progressSeeding()
    .catch((err) => {
      throw err;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  await prioritiesSeeding()
    .catch((err) => {
      throw err;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  await usersSeeding()
    .catch((err) => {
      throw err;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  await tasksSeeding()
    .catch((err) => {
      throw err;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

seeding();
