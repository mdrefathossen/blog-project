const bcrypt = require('bcrypt')
const User = require('../models/User')
exports.signupGetController = (req,res,next) => {
     
   res.render('pages/auth/signup',{title: 'Create A New Accoutn'})

}
exports.signupPostController = async (req,res,next) => {
    const {username,email,password} = req.body;
   
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
    res.render('pages/auth/login',{title: 'Login Your Account'})

}
exports.loginPostController = async (req,res,next) => {
    const {email,password} = req.body;
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