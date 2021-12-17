const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function progressSeeding() {
  await prisma.progress.createMany({
    data: [
      {
        id: 1,
        level: "やること",
      },
      {
        id: 2,
        level: "進行中",
      },
      {
        id: 3,
        level: "完了",
      },
    ],
  });

  console.log("insert progress data successfully!!");
}

module.exports = progressSeeding;
