const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const User = require('../models/User');
const errorFormatter = require('../utils/validationErrorFormater')
const Flash = require('../utils/Flash')
exports.signupGetController = (req,res,next) => {
    
   res.render('pages/auth/signup',
   {
        title: 'Create A New Account',
        error: {},
        value: {},
        flashMessage: Flash.getMessage(req)
            },)

}
exports.signupPostController = async (req,res,next) => {
    let {username,email,password} = req.body;
    let errors = validationResult(req).formatWith(errorFormatter);
   
    if(!errors.isEmpty()){
        req.flash('fail','Please Check Your Form')
        return res.render('pages/auth/signup',
        {
            title: 'Create A New Accoutn',
            error: errors.mapped(),
            value: {
                username,
                email,
                password
            },
            flashMessage: Flash.getMessage(req)
        
        })
    }
    
   
    try{
        let hashedPassword = await bcrypt.hash(password,11)
        let user = new User ({
            username,
            email,
            password: hashedPassword
            
        })
        await user.save()
        req.flash('success','User Created Sucessfully')
        
        res.redirect('/auth/login')

    } catch(e){
        console.log(e)
        next(e)
    }
    

}
exports.loginGetController = (req,res,next) => {
    
   
    res.render('pages/auth/login',{
        title: 'Login Your Account',
        error: {},
        flashMessage: Flash.getMessage(req)
    });
    

}
exports.loginPostController = async (req,res,next) => {
    const {email,password} = req.body;
    
    
    
    let errors = validationResult(req).formatWith(errorFormatter);
    
    if(!errors.isEmpty()){
        req.flash('fail','Please Check Your Form')
        return res.render('pages/auth/login',
        {
            title: 'Log In To Your Account',
            error: errors.mapped(),
            flashMessage: Flash.getMessage(req)
        })
    }
    
    try{
        let user = await User.findOne({email})
        if(!user){
            req.flash('fail','Please Provide valide Credebtial')
            return res.render('pages/auth/login',
            {
                title: 'Log In To Your Account',
                error: {},
                flashMessage: Flash.getMessage(req) 
            })
        }
        let match = await bcrypt.compare(password,user.password)
        if(!match) {
            req.flash('fail','Please Provide valide Credebtial')
            return res.render('pages/auth/login',
        {
            title: 'Log In To Your Account',
            error: {},
            flashMessage: Flash.getMessage(req)
        })
        }
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save(err => {
            if(err){
                console.log(err)
                return next(err)
            }
            req.flash('success','SuccessFul Logged In')
            res.redirect('/dashboard')
        })
        
    } catch (e){
        console.log(e)
        next(e)
    }

}

exports.logoutController = (req,res,next) => {
    req.session.destroy(err => {
        if(err){
            console.log(err)
            return next(err)
        }
        // req.flash('success','Successfully Logout')
        return res.redirect('/auth/login')
    })
}