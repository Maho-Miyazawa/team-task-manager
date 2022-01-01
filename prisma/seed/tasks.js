const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function tasksSeeding() {
  await prisma.tasks.createMany({
    data: [
      {
        user_id: "1",
        task: "アポをとる",
        priority_id: 1,
      },
      {
        user_id: "1",
        task: "A社を訪問する",
        priority_id: 2,
      },
      {
        user_id: "1",
        task: "C社のフォロー",
        priority_id: 3,
      },
      {
        user_id: "1",
        task: "B社のキックオフ",
        priority_id: 1,
      },
      {
        user_id: "1",
        task: "領収書の提出",
        priority_id: 1,
      },
      {
        user_id: "1",
        task: "D社と会食",
        priority_id: 3,
      },
      {
        user_id: "2",
        task: "備品の発注書作成",
        priority_id: 3,
      },
      {
        user_id: "2",
        task: "部署の掃除",
        priority_id: 2,
      },
      {
        user_id: "2",
        task: "決裁",
        priority_id: 3,
      },
      {
        user_id: "3",
        task: "企画出し",
        priority_id: 1,
      },
      {
        user_id: "4",
        task: "アポ取り",
        priority_id: 2,
      },
      {
        user_id: "5",
        task: "会議室片付け",
        priority_id: 3,
      },
      {
        user_id: "6",
        task: "発注書作成",
        priority_id: 1,
      },
      {
        user_id: "7",
        task: "企画書提出",
        priority_id: 1,
      },
      {
        user_id: "8",
        task: "資料作成",
        priority_id: 3,
      },
      {
        user_id: "9",
        task: "会議室準備",
        priority_id: 3,
      },
      {
        user_id: "10",
        task: "社内調査",
        priority_id: 2,
      },
      {
        user_id: "11",
        task: "廃品回収",
        priority_id: 3,
      },
      {
        user_id: "12",
        task: "資料作成(5部)",
        priority_id: 3,
      },
      {
        user_id: "4",
        task: "営業部との会議",
        priority_id: 3,
      },
      {
        user_id: "5",
        task: "説明会準備",
        priority_id: 2,
      },
      {
        user_id: "6",
        task: "掃除",
        priority_id: 3,
      },
      {
        user_id: "7",
        task: "11:00 会議",
        priority_id: 3,
      },
      {
        user_id: "8",
        task: "資料30部コピー",
        priority_id: 3,
      },
      {
        user_id: "9",
        task: "講演会準備",
        priority_id: 3,
      },
      {
        user_id: "10",
        task: "備品補充",
        priority_id: 2,
      },
      {
        user_id: "11",
        task: "ゴミ捨て",
        priority_id: 3,
      },
      {
        user_id: "4",
        task: "資料作成 (〆11:00)",
        priority_id: 3,
      },
    ],
  });

  console.log("insert tasks data successfully!!");
}

module.exports = tasksSeeding;
