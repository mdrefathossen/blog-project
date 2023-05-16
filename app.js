const express = require('express');
const morgan = require('morgan')
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

app.listen(PORT,() => {
    console.log(`Server is Running on Port ${PORT}`)
})