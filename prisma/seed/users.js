const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function usersSeeding() {
  await prisma.users.createMany({
    data: [
      {
        id: "1",
        team_id: 5,
        name: "山田　太郎",
      },
      {
        id: "2",
        team_id: 1,
        name: "佐藤　花子",
      },
      {
        id: "3",
        team_id: 4,
        name: "鈴木　次郎",
      },
      {
        id: "4",
        team_id: 4,
        name: "木下　啓太",
      },
    ],
  });

  console.log("insert users data successfully!!");
}

module.exports = usersSeeding;
