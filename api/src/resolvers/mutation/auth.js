const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('../../gravatar');

module.exports = {
    signUp: async ({ username, email, password }, { models }) => {
        // normalize email address
        email = email.trim().toLowerCase();

        // hash password
        const hashed = await bcrypt.hash(password, 10);

        // create the gravatar url
        const avatar = gravatar(email);

        try {
            const user = await models.User.create({
                username,
                email,
                avatar,
                password: hashed
            });

            // create and return the json web token
            return jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
            
        } catch (error) {
            console.error(error); // log any error
            throw new Error('Error creating new account');
        }
    },
    signIn: async ({ username, email, password }, { models }) => {
        // if email is provided
        if (email) {
            email = email.trim().toLowerCase();
        }

        // get user
        const user = await models.User.findOne({
            $or: [{ email }, { username }]
        });

        // if there is no user, throw an authentication error
        if (!user) {
            throw new AuthenticationError('Error signing in');
        }

        // if the password don't match, throw an authentication error
        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            throw new AuthenticationError('Error signing in');
        }

        // create and return the json web token
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    }
}