const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  type User {
    id: Int
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
    user_id: Int
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

  type createTask {
    id: Int
    user_id: Int
    task: String
    progress_id: Int
    priority_id: Int
    is_deleted: Boolean
    created_at: Date
    updated_at: Date
  }

  type updateTask {
    id: Int
    user_id: Int
    task: String
    progress_id: Int
    priority_id: Int
    is_deleted: Boolean
    created_at: Date
    updated_at: Date
  }

  type deleteTask {
    id: Int
    user_id: Int
    task: String
    progress_id: Int
    priority_id: Int
    is_deleted: Boolean
    created_at: Date
    updated_at: Date
  }

  type Query {
    AllUsers(name: String): [User]
    User(id: Int): TasksInUser
    Tasks(user_id: Int): [Task]
  }

  type Mutation {
    createNewTask(user_id: Int, task: String, priority_id: Int): createTask
    updateProgress(taskId: Int, afterProgressNum: Int): updateTask
    deleteTask(taskId: Int): deleteTask
    updateTask(taskId: Int, task: String, priority_id: Int): updateTask
  }
`;

module.exports = typeDefs;
