const express = require('express');
const router = require('./routes/UserRoute');
const app = express();

app.use('/users',router)
app.get('/',(req,res)=>{
    res.send("restaurant app api v1")
})

module.exports = app;