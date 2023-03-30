
module.exports = {
    hello: () => {
        return `Hello World!`;
    },
    todos: async (args, { models }) => {
        return await models.Todo.find();
    },
    todo: async (args, { models }) => {
        return await models.Todo.findById(args.id);
    },
    users: async (args, { models }) => {
        return await models.User.find();
    }
}