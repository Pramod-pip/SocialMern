const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
    feed_message:{
        type: String,
        default: ''
    },
    feed_images:{
        type: Array,
        default: []
    },
    feed_likes:{
        type: String,
        default: 0,
    },
    feed_comments:{
        type: String,
        default: '',
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
