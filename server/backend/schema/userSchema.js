const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_fullname:{
        type: String,
    },
    user_email:{
        type: String,
    },
    user_password:{
        type: String,
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
