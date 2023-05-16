// user, title,bio,profilePics, link: {fb,twet},posts,bookmark
const {model,Schema} = require('mongoose');


const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name : {
        type:String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        trim: true,
        maxlength: 100,
        maxlength : 38
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 500
    },
    profilePic : String,
    links: {
        website: String,
        facebook: String,
        twitter: String,
        github: String
    },
    posts : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
},{timestamps: true})
const Profile = model('Profile',profileSchema)

module.exports = Profile