const mongoose = require('mongoose');
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');

module.exports = {
    createTodo: async (args, { models, user }) => {
        
        // if user is not login
        if (!user) {
            throw new AuthenticationError('You must login to create a new todo.');
        }

        return await models.Todo.create({
            title: args.title,
            createdBy: mongoose.Types.ObjectId(user.id)
        });

    },
    updateTodo: async ({ id, title }, { models, user }) => {
        // if no user
        if (!user) {
            throw new AuthenticationError('You must sign in to update a todo.');
        }

        // get todo id
        const todo = await models.Todo.findById(id);

        // check if todo belong to user, if not then raise forbidden error
        if (todo && String(todo.createdBy) != user.id) {
            throw new ForbiddenError("You don't have permission to modify this todo.");
        }

        return await models.Todo.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: { title }
            },
            {
                new: true
            }
        );
    },
    deleteTodo: async ({ id }, { models, user }) => {
        // if no user
        if (!user) {
            throw new AuthenticationError("You must sign in to delete a todo.");
        }

        // find todo in db
        const todo = await models.Todo.findById(id);

        // if todo exist and doesn't below to user
        if (todo && String(todo.createdBy) !== user.id) {
            throw new ForbiddenError("You don't have permissions to delete this todo.");
        }

        try {
            await models.Todo.findOneAndRemove({ _id: id });
            return true;
        } catch (error) {
            console.error(error); // log any errors
            return false;
        }
    },
    toggleFavorite: async ({ id }, { models, user }) => {
        if (!user) {
            throw new AuthenticationError('You must sign in.');
        }

        // check user already made it favorite the todo
        let todoCheck = await models.Todo.findById(id);

        const hasTodo = todoCheck.favoritedBy.indexOf(user.id);

        // if the user exists in the list
        // pull them from the list and reduce the favoriteCount by 1
        if (hasTodo >= 0) {
            return await models.Book.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        favoritedBy: mongoose.Types.ObjectId(user.id)
                    },
                    $inc: {
                        favoriteCount: -1
                    }
                },
                {
                    // set new to true to return the updated doc
                    new: true
                }
            )
        } else {
            // if the user doesn't exist in the list
            // add them to the list and increment the favoriteCount by 1
            return await models.Todo.findByIdAndUpdate(
                id,
                {
                    $push: {
                        favoritedBy: mongoose.Types.ObjectId(user.id)
                    },
                    $inc: {
                        favoriteCount: 1
                    }
                },
                {
                    new: true
                }
            )
        }
    }
}