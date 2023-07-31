const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
    feed_email:{
        type: String,
        required: true
    },
    feed_message:{
        type: String,
        default: ''
    },
    feed_images:{
        type: Array,
        default: []
    },
    feed_likes:{
        type: Number,
        default: 0,
    },
    feed_comments:{
        type: String,
        default: '',
    }

})

feedSchema.virtual('id').get(function () {
    return this._id.toHexString();
})

feedSchema.set('toJSON', {
    virtuals: true,
})

exports.Feeds = mongoose.model('Feeds', feedSchema);
exports.feedSchema = feedSchema;
