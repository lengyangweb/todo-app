const { 
    hello, 
    todos,
    todo,
    users
} = require('./query');

const {
    createTodo,
    updateTodo,
    deleteTodo,
    signUp,
    signIn
} = require('./mutation');

module.exports = {
    hello,
    todos,
    todo,
    users,
    // mutation
    createTodo,
    updateTodo,
    deleteTodo,
    signUp,
    signIn
}