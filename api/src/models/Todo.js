const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    }
},
{
    timestamps: true
}
);

const Todo = mongoose.model('Todo', Schema);

module.exports = Todo;