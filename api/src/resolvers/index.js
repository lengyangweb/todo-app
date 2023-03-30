const { 
    hello, 
    todos,
    todo
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
    // mutation
    createTodo,
    updateTodo,
    deleteTodo,
    signUp,
    signIn
}