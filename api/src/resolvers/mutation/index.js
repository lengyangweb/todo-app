const { createTodo, updateTodo, deleteTodo, toggleFavorite } = require('./Todo');
const { signUp, signIn } = require('./auth');

module.exports = {
    createTodo,
    updateTodo,
    deleteTodo,
    signUp,
    signIn,
    toggleFavorite
};