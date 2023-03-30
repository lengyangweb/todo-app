const jwt = require('jsonwebtoken');
const schema = require('../schema');
const models = require('../models');
const resolvers = require('../resolvers');
var graphqlHTTP = require('express-graphql').graphqlHTTP;

const getUser = (token) => {
    if (token) {
        try {
            // return the user information in the token
            return jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch (error) {
            // if there's a problem with the token, throw an error
            throw new Error('Session invalid');
        }
    }
};

module.exports = register = (app) => {

    // graphql api endpoint
    app.use('/graphql', graphqlHTTP((req, res, graphQLParams) => {

        // get the user token from the headers
        const token = req.headers.hasOwnProperty('authorization') && req.headers.authorization.includes('Bearer') ? req.headers.authorization.split(' ')[1] : undefined;

        // try to retrieve a user with the token
        const user = getUser(token);

        return {
            schema: schema,
            rootValue: resolvers,
            graphiql: process.env.NODE_ENV === 'development',
            context: { models, user }
        }

    }));
}