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

  type Team {
    id: String
    name: String
    created_at: Date
    updated_at: Date
  }

  type Profile {
    id: String
    team_id: Int
    name: String
    created_at: Date
    updated_at: Date
    team: Team
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

  type OneTask {
    id: Int
    user_id: String
    task: String
    progress_id: Int
    priority_id: Int
    is_deleted: Boolean
    created_at: Date
    updated_at: Date
  }

  type Member {
    id: String
    team_id: Int
    name: String
    created_at: Date
    updated_at: Date
    team: Team
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
    OneTask(taskId: Int): OneTask
    CollateUserId(id: String): Profile
    Member(teamId: Int): [Member]
  }

  type Mutation {
    createNewTask(user_id: String, task: String, priority_id: Int): crudTask
    updateProgress(taskId: Int, afterProgressNum: Int): crudTask
    deleteTask(taskId: Int): crudTask
    updateTask(taskId: Int, task: String, priority_id: Int): crudTask
    createNewUser(id: String, teamId: Int, name: String): Profile
  }
`;

module.exports = typeDefs;
