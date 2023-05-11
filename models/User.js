// Name, Email, Password and Profile
const {Schema,model} = require('mongoose');
const Profile = require('./Profile')

const userSchema = Schema({
    name: {
        type: String,
        trim : true,
        maxlength : 38,
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
        ref: Profile
    }
},{
    timestap: true
})

const User = model('User',userSchema)
module.exports = User 