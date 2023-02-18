const models = require('../../models');

module.exports = {
    hello: () => {
        return `Hello World!`;
    },
    todos: async () => {
        return await models.Todo.find();
    }
}