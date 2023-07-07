const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_fullname:{
        type: String,
        required: true
    },
    user_email:{
        type: String,
        required: true
    },
    user_password:{
        type: String,
        required: true
    }
})

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
})

userSchema.set('toJSON', {
    virtuals: true,
})

exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;
