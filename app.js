const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("restaurant app api v1")
})

module.exports = app;