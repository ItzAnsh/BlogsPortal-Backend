const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6  
    },
    profilePicture: String,  //URL
    bio: String,              
    dateJoined: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true 
    },
    role: {
        type: String,
        enum: ['user', 'admin'], 
        default: 'user'
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
