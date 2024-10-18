const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,  // Enforce uniqueness
        match: /.+\@.+\..+/  // Basic email validation
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });  // Automatically manage createdAt and updatedAt

const User = mongoose.model('User', UserSchema);  // Use 'User' as the model name
module.exports = User;
