const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function prioritiesSeeding() {
  await prisma.priorities.createMany({
    data: [
      {
        id: 1,
        level: "低",
      },
      {
        id: 2,
        level: "中",
      },
      {
        id: 3,
        level: "高",
      },
    ],
  });

  console.log("insert priorities data successfully!!");
}

module.exports = prioritiesSeeding;
