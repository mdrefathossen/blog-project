const router = require('express').Router();
const upload = require('../middleware/uplodeMiddleware')


router.get('/play',(req,res,next) => {
    console.log('Test TEst')
    res.render('playground/play',{title: 'Playground',flashMessage: {}})
})

router.post('/play',upload.single('my-file'),(req,res,next) => {
    if(req.file){
        console.log(req.file)
    }
    console.log('Test poost')
    res.redirect('/playground/play')
       

})
module.exports = router