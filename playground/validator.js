const router = require('express').Router();
const {check,validationResult} = require('express-validator')
const Flash = require('../utils/Flash')

router.get('/validator',(req,res) => {
    console.log(Flash.getMessage(req))
    res.render('playground/signup',{title:"Validator Playground"})
})

router.post('/validator',
    [
        check('username')
            .not()
            .isEmpty()
            .withMessage('User Name Can not be Empty')
            .isLength({max : 15})
            .withMessage(`Username can not be greater then 15 Charctar`)
            .trim(),
        check('email')
            .isEmail()
            .withMessage("Please Provide A Valid Email")
            .normalizeEmail(),
        check('password').custom(value => {
            if(value.length < 5) {
                throw new Error("Password Must be greater then 5 charactar")
            }
            return true
        }),
        check('confirmPassword').custom((value,{req}) => {
            if(value != req.body.password) {
                throw new Error("Password Dose Not Mactch")
            }
            return true
        })
    ],
    (req,res) => {
        let errors = validationResult(req)
        if(!errors.isEmpty()){
            req.flash('fail',"There is Some error")
        } else {
            req.flash('Succes','There Is No Error')
        }
        res.redirect('/playground/validator')
       

})
module.exports = router