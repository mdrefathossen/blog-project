const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const User = require('../models/User');
const errorFormatter = require('../utils/validationErrorFormater')
exports.signupGetController = (req,res,next) => {
     
   res.render('pages/auth/signup',{title: 'Create A New Accoutn',error: {},value: {}},)

}
exports.signupPostController = async (req,res,next) => {
    let {username,email,password} = req.body;
    let errors = validationResult(req).formatWith(errorFormatter);
    if(!errors.isEmpty()){
        return res.render('pages/auth/signup',
        {
            title: 'Create A New Accoutn',
            error: errors.mapped(),
            value: {
                username,
                email,
                password
            }
        
        })
    }
    
   
    try{
        let hashedPassword = await bcrypt.hash(password,11)
        let user = new User ({
            username,
            email,
            password: hashedPassword
            
        })
        let createdUser = await user.save()
        console.log('User Created Succesfully',createdUser);
        res.render('pages/auth/signup',{title: 'Create A New Accoutn'})

    } catch(e){
        console.log(e)
        next(e)
    }
    

}
exports.loginGetController = (req,res,next) => {
    res.render('pages/auth/login',{title: 'Login Your Account',error: {}})

}
exports.loginPostController = async (req,res,next) => {
    const {email,password} = req.body;
    let errors = validationResult(req).formatWith(errorFormatter);
    if(!errors.isEmpty()){
        return res.render('pages/auth/login',
        {
            title: 'Log In To Your Account',
            error: errors.mapped()
        })
    }
    
    try{
        let user = await User.findOne({email})
        if(!user){
            return res.json({
                message: 'Invalid Credential'
            })
        }
        let match = await bcrypt.compare(password,user.password)
        if(!match) {
            return res.json({
                message: "Invalid Credentail"
            })
        }
        console.log("Successfully Logged in",user)
        res.render('pages/auth/login',{title: 'Login Your Account'})
    } catch (e){
        console.log(e)
        next(e)
    }

}

exports.logoutController = (req,res,next) => {
    
}