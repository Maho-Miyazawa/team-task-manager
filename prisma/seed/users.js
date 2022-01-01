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
      {
        id: "5",
        team_id: 5,
        name: "栗田　大輔",
      },
      {
        id: "6",
        team_id: 1,
        name: "明石　マリ",
      },
      {
        id: "7",
        team_id: 4,
        name: "小池　信之",
      },
      {
        id: "8",
        team_id: 4,
        name: "葉山　涼子",
      },
      {
        id: "9",
        team_id: 5,
        name: "神山　太一",
      },
      {
        id: "10",
        team_id: 1,
        name: "千堂　麻子",
      },
      {
        id: "11",
        team_id: 4,
        name: "軒下　ふみ",
      },
      {
        id: "12",
        team_id: 4,
        name: "朝日　徹",
      },
    ],
  });

  console.log("insert users data successfully!!");
}

module.exports = usersSeeding;
