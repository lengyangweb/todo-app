require('dotenv').config();
var cors = require('cors');
var colors = require('colors');
var express = require('express');
var models = require('./models');
var schema = require('./schema');
var resolvers = require('./resolvers');
const connectDB = require('./config/db'); 
var { graphqlHTTP } = require('express-graphql');

const PORT = process.env.PORT || 8000;

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

// init an express app
var app = express();

// allow all origins to hit this endpoint
app.use(cors());

// connect to database
connectDB();

// graphql api endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: process.env.NODE_ENV === 'development',
  context: () => {
    return { models };
  }
}));


app.listen(PORT, () => console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`.underline.cyan.bold) );