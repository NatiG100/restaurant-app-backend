require('dotenv').config()
const {PORT,MONGO_DB_CONNECTION} = process.env;

const express = require('express');
const router = require('./routes/UserRoute');
const app = express();

const bodyParser = require('body-parser');
const sessioin = require('express-session');
const MongoDBStore = require('connect-mongodb-session');

var store = new MongoDBStore({
    uri:MONGO_DB_CONNECTION+"/restaurant-menu",
    collection:'mySessions',
})
store.on('error',function(error){
    console.log(error);
});

app.use(sessioin({
    secret: 'This is a secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: false,
    saveUninitialized: false
}));


app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/users',router)
app.get('/',(req,res)=>{
    res.send("restaurant app api v1")
})

module.exports = app;