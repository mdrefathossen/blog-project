require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const session  = require('express-session')
const config = require('config');
const mongoose = require('mongoose')
//imports Routes
const setMiddlewar = require('./middleware/middleware')
const setRoutes = require('./routes/routes')



// const validatorRoutes = require('./playground/validator')
let DB_ADMIN = process.env.DB_ADMIN
let DB_PASSWORD = process.env.DB_PASSWORD
const MONGODB_URI = `mongodb+srv://${config.get('db-username')}:${config.get('db-password')}@cluster0.ahw56ah.mongodb.net/?retryWrites=true&w=majority`




const app = express();


//setup view engin
app.set('view engine','ejs');
app.set('views','views')

// using Middleware  from middlewar direactory
setMiddlewar(app)

// using routes from Routes Directory
setRoutes(app)

app.use((req,res,next) => {
    let error = new Error('404 Not Found');
    error.status = 404
    next(error)
})

app.use((error,req,res,next) => {
    if(error.status === 404){
        return res.render('pages/error/404', {flashMessage : {}})
    }
    console.log(error)
    res.render('pages/error/500',{flashMessage : {}})
})

const PORT = process.env.port || 8080;
mongoose
    .connect(`mongodb+srv://${config.get('db-username')}:${config.get('db-password')}@cluster0.ahw56ah.mongodb.net/?retryWrites=true&w=majority`,{useNewUrlParser: true})
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