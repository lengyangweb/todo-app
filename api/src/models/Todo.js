const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    favoriteCount: {
        type: Number,
        default: 0
    },
    favoritedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    timestamps: true
}
);

const Todo = mongoose.model('Todo', Schema);

module.exports = Todo;