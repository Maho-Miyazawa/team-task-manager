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

  type Query {
    Users: [Users]
  }
`;

module.exports = typeDefs;
