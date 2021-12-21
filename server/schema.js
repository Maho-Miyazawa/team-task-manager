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

  type NotesInUser {
    id: Int
    team_id: Int
    name: String
    notes: [Note]
    created_at: Date
    updated_at: Date
  }

  type Note {
    id: Int
    user_id: Int
    note: String
    progress: Int
    priority: Int
    is_deleted: Boolean
    user: User
    created_at: Date
    updated_at: Date
  }

  type Query {
    AllUsers(name: String): [User]
    User(id: Int): NotesInUser
    Notes(user_id: Int): [Note]
  }
`;

module.exports = typeDefs;
