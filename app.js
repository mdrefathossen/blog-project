const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')



const app = express()

//setup view engin
app.set('view engine','ejs');
app.set('views','views')

// Middleware Array
const middleware = [
    morgan('dev'),
    // express.static('public'),
    express.static('public'),
    express.urlencoded({extended: true}),
    express.json()
]
app.use(middleware)
app.use('/auth',authRoutes)


app.get('/',(req,res) => {
    
    res.json({
        message: "Hellow World"
    })
})

const PORT = process.env.port || 8080;
mongoose
    .connect(`mongodb+srv://refatnew:refatneww@cluster0.ahw56ah.mongodb.net/?retryWrites=true&w=majority`,{useNewUrlParser: true})
    .then(() => {
        console.log('database connected')
        app.listen(PORT, () => {
            console.log(`Server is Running on Port ${PORT}`)
        })
    })
    .catch(e => {
        return console.log(e)
    })

// app.listen(PORT,() => {
//     console.log(`Server is Running on Port ${PORT}`)
// })