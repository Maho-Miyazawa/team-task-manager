const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  type User {
    id: String
    team_id: Int
    name: String
    created_at: Date
    updated_at: Date
  }

  type TasksInUser {
    id: Int
    team_id: Int
    name: String
    tasks: [Task]
    created_at: Date
    updated_at: Date
  }

  type Progress {
    id: Int
    level: String
    created_at: Date
    updated_at: Date
  }

  type Priority {
    id: Int
    level: String
    created_at: Date
    updated_at: Date
  }

  type Task {
    id: Int
    user_id: String
    task: String
    progress_id: Int
    priority_id: Int
    is_deleted: Boolean
    user: User
    progress: Progress
    priority: Priority
    created_at: Date
    updated_at: Date
  }

  type crudTask {
    id: Int
    user_id: String
    task: String
    progress_id: Int
    priority_id: Int
    is_deleted: Boolean
    created_at: Date
    updated_at: Date
  }

  type Query {
    AllUsers(name: String): [User]
    User(id: String): TasksInUser
    Tasks(user_id: String): [Task]
  }

  type Mutation {
    createNewTask(user_id: String, task: String, priority_id: Int): crudTask
    updateProgress(taskId: Int, afterProgressNum: Int): crudTask
    deleteTask(taskId: Int): crudTask
    updateTask(taskId: Int, task: String, priority_id: Int): crudTask
  }
`;

module.exports = typeDefs;
