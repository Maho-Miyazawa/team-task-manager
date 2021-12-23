const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function tasksSeeding() {
  await prisma.tasks.createMany({
    data: [
      {
        user_id: 1,
        task: "アポをとる",
        priority_id: 1,
      },
      {
        user_id: 1,
        task: "A社を訪問する",
        priority_id: 2,
      },
      {
        user_id: 1,
        task: "C社のフォロー",
        priority_id: 3,
      },
      {
        user_id: 1,
        task: "B社のキックオフ",
        priority_id: 1,
      },
      {
        user_id: 1,
        task: "領収書の提出",
        priority_id: 1,
      },
      {
        user_id: 1,
        task: "D社と会食",
        priority_id: 3,
      },
      {
        user_id: 2,
        task: "備品の発注書作成",
        priority_id: 3,
      },
      {
        user_id: 2,
        task: "部署の掃除",
        priority_id: 2,
      },
      {
        user_id: 2,
        task: "決裁",
        priority_id: 3,
      },
    ],
  });

  console.log("insert tasks data successfully!!");
}

module.exports = tasksSeeding;
