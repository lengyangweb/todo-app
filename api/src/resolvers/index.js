const { 
    hello, 
    todos,
    todo,
    users,
    user,
    me
} = require('./query');

const {
    createTodo,
    updateTodo,
    deleteTodo,
    signUp,
    signIn,
    toggleFavorite
} = require('./mutation');

module.exports = {
    hello,
    todos,
    todo,
    users,
    user,
    me,
    // mutation
    createTodo,
    updateTodo,
    deleteTodo,
    signUp,
    signIn,
    toggleFavorite
}