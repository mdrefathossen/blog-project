// title, body,author,tags,thumbnail,readTime,likes,dislikes,comments
const {Schema,model} = require('mongoose');
const User = require('./User');
const comment = require('./Comments')
const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    body : {
        type: String,
        required: true
    },
    author : {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    tags: {
        type: [String],
        required : true
    },
    thumbnail: String,
    readTime: String,
    likes: [{
        type: [Schema.Types.ObjectId],
        ref:user
    }],
    dislikes: [{
        type: [Schema.Types.ObjectId],
        ref:user
    }],
    comments : [
        {
            type: Schema.Types.ObjectId,
            ref: Comment
        }
    ]
},{timestamps: true})
const Post = model('Post',postSchema);
module.exports = Post