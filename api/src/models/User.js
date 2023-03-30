const { Schema, model } = require('mongoose');

// instantiate a user schema
const userSchema = new Schema({
    username: { 
        type: String,
        required: true,
        index: { unique: true }
    },
    email: { 
        type: String,
        required: true,
        index: { unique: true }
    },
    password: { 
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
},
{
    timestamps: true
}
);

// create a mongoose model
const Model = model('User', userSchema);

// export model
module.exports = Model;