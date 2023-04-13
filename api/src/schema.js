const { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
module.exports = buildSchema(`
    type Query {
        hello: String
        todos: [Todo]!
        todo(id: ID!): Todo!
        users: [User!]!
        user(username: String!): User!
        me: User!
    }
    type Mutation {
        createTodo(title: String!): Todo!
        updateTodo(id: ID!, title: String!): Todo!
        deleteTodo(id: ID!): Boolean!
        signUp(username: String!, email: String!, password: String!): String!
        signIn(username: String, email: String, password: String!): String!
        toggleFavorite(id: ID!): Todo!
    }
    type Todo {
        id: ID!
        title: String!
        createdBy: ID!
        favoriteCount: Int!
        favoriteBy: [ID!]
    }
    type User {
        id: ID!
        username: String!
        email: String!
        avatar: String!
        todos:[Todo!]!
        favoriates: [Todo!]!
    }
`);