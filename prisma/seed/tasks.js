const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function tasksSeeding() {
  await prisma.tasks.createMany({
    data: [
      {
        user_id: 1,
        task: "アポをとる",
        progress_id: 2,
        priority: 2,
      },
      {
        user_id: 1,
        task: "A社を訪問する",
        progress_id: 1,
        priority: 2,
      },
      {
        user_id: 2,
        task: "備品の発注書作成",
        progress_id: 1,
        priority: 3,
      },
      {
        user_id: 2,
        task: "部署の掃除",
        progress_id: 2,
        priority: 2,
      },
      {
        user_id: 2,
        task: "決裁",
        progress_id: 1,
        priority: 3,
      },
    ],
  });

  console.log("insert tasks data successfully!!");
}

module.exports = tasksSeeding;
