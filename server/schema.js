const { gql } = require("apollo-server");

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

  type Task {
    id: Int
    user_id: Int
    task: String
    progress: Int
    priority: Int
    is_deleted: Boolean
    user: User
    created_at: Date
    updated_at: Date
  }

  type Query {
    AllUsers(name: String): [User]
    User(id: Int): TasksInUser
    Tasks(user_id: Int): [Task]
  }
`;

module.exports = typeDefs;
