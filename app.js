require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session  = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const config = require('config')
//imports Routes
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes')


// import middeleare 
const {bindUserWithRequest} = require('./middleware/authMiddleware');
// const setLocals = require('./middleware/setLocals');
const setLocals = require('./middleware/setLocals')
//validator routes
// const validatorRoutes = require('./playground/validator')
let DB_ADMIN = process.env.DB_ADMIN
let DB_PASSWORD = process.env.DB_PASSWORD
const MONGODB_URI = `mongodb+srv://${config.get('db-username')}:${config.get('db-password')}@cluster0.ahw56ah.mongodb.net/?retryWrites=true&w=majority`
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 2
  });

console.log(process.env.NODE_ENV)

const app = express();
console.log(config.get('name'))

if(app.get('env').toLowerCase() == 'development'){
    app.use(morgan('dev'))
}

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
    setLocals(),
    flash()
]
app.use(middleware)
app.use('/auth',authRoutes)
app.use('/dashboard',dashboardRoutes)
// app.use('/playground',validatorRoutes)


app.get('/',(req,res) => {
    
    res.json({
        message: "Hellow World"
    })
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