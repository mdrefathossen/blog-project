const User = require('../models/User')
exports.signupGetController = (req,res,next) => {
    
    res.render('pages/auth/signup',{title: 'Create A New Accoutn'})

}
exports.signupPostController = async (req,res,next) => {
    const {username,email,password} = req.body;
    let usr = ({
        username,
        email,
        password
        
    })
    try{
        let createdUser = await user.save()
        console.log('User Created Succesfully',createdUser);
        res.render('pages/auth/signup',{title: 'Create A New Accoutn'})

    } catch(e){
        console.log(e)
        next(e)
    }
    

}
exports.loginGetController = (req,res,next) => {

}
exports.loginPostController = (req,res,next) => {

}

exports.logoutController = (req,res,next) => {
    
}