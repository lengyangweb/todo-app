const { Schema, model } = require('mongoose');

// instantiate a user schema
const userSchema = new Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String }
});

// create a mongoose model
const Model = model('User', userSchema);

// export model
module.exports = Model;