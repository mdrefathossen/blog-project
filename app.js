const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session  = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
//imports Routes
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes')


// import middeleare 
const {bindUserWithRequest} = require('./middleware/authMiddleware');
// const setLocals = require('./middleware/setLocals');
const setLocals = require('./middleware/setLocals')


const MONGODB_URI = 'mongodb+srv://refatnew:refatneww@cluster0.ahw56ah.mongodb.net/?retryWrites=true&w=majority'
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 2
  });

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
    express.json(),
    session({
        secret: process.env.SECRET_KEY || 'SECRET_KEY',
        resave: false,
        saveUninitialized: false,
        store: store
        
    }),
    bindUserWithRequest(),
    setLocals()
]
app.use(middleware)
app.use('/auth',authRoutes)
app.use('/dashboard',dashboardRoutes)


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