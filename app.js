const express = require('express');

const app = express()

app.get('/',(req,res) => {
    res.json({
        message: "Hellow World"
    })
})

const PORT = process.env.port || 8080;

app.listen(PORT,() => {
    console.log(`Server is Running on Port ${PORT}`)
})