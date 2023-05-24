// Name, Email, Password and Profile
const {Schema,model} = require('mongoose');

const userSchema = Schema({
    username: {
        type: String,
        trim : true,
        maxlength: 15,
        required: true
    },
    email: {
        type: String,
        trim : true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    profilePics: {
        type: String,
        default: '/uploads/default.png'
    }
},{
    timestap: true
})

const User = model('User',userSchema)
module.exports = User 