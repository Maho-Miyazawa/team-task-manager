const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date

  type Users {
    id: Int
    team_id: Int
    name: String
    created_at: Date
    updated_at: Date
  }

  type Notes {
    id: Int
    user_id: Int
    note: String
    progress: Int
    priority: Int
    is_deleted: Boolean
    created_at: Date
    updated_at: Date
  }

  type Query {
    Users(name: String): [Users]
    Notes(user_id: Int): [Notes]
  }
`;

module.exports = typeDefs;
