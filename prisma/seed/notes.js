const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function notesSeeding() {
  await prisma.notes.createMany({
    data: [
      {
        user_id: 1,
        note: "アポをとる",
        progress: 2,
        priority: 2,
      },
      {
        user_id: 1,
        note: "A社を訪問する",
        progress: 1,
        priority: 2,
      },
      {
        user_id: 2,
        note: "備品の発注書作成",
        progress: 1,
        priority: 3,
      },
    ],
  });

  console.log("insert notes data successfully!!");
}

module.exports = notesSeeding;
