const { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
module.exports = buildSchema(`
    type Query {
        hello: String
        todos: [Todo]!
    }
    type Todo {
        id: ID!
        title: String!
        createdBy: String!
    }
`);