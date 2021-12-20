const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function usersSeeding() {
  await prisma.users.createMany({
    data: [
      {
        team_id: 5,
        name: "山田　太郎",
      },
      {
        team_id: 1,
        name: "佐藤　花子",
      },
      {
        team_id: 4,
        name: "鈴木　次郎",
      },
      {
        team_id: 4,
        name: "木下　啓太",
      },
    ],
  });

  console.log("insert users data successfully!!");
}

module.exports = usersSeeding;
