const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function teamsSeeding() {
  await prisma.teams.createMany({
    data: [
      {
        id: 1,
        name: "総務部",
      },
      {
        id: 2,
        name: "人事部",
      },
      {
        id: 3,
        name: "経理部",
      },
      {
        id: 4,
        name: "広報部",
      },
      {
        id: 5,
        name: "営業部",
      },
      {
        id: 6,
        name: "企画部",
      },
      {
        id: 7,
        name: "社長室",
      },
    ],
  });

  console.log("insert teams data successfully!!");
}

module.exports = teamsSeeding;
