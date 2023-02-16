require('dotenv').config()
const {PORT,MONGO_DB_CONNECTION} = process.env;

const express = require('express');
const UserRouter = require('./routes/UserRoute');
const app = express();

const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const AuthRouter = require('./routes/AuthRoute');
const cors = require('cors');
const FoodCategoryRoute = require('./routes/FoodCategoryRoute');
const FoodRoute = require('./routes/FoodRoute');
const DrinkCategoryRoute = require('./routes/DrinkCategoryRoute');
const DrinkRoute = require('./routes/DrinkRoute');
const TableRoute = require('./routes/TableRoute');
const OrderRouter = require('./routes/OrderRoute');

var store = new MongoDBStore({
    uri:MONGO_DB_CONNECTION+"/restaurant-menu",
    collection:'mySessions',
})
store.on('error',function(error){
    console.log(error);
});
var whitelist = ['http://localhost:3000', 'http://172.20.44.116:3000']
app.use(cors({
    credentials:true,
    origin: function (origin, callback) {
          callback(null, true)
      },
}));

app.use(session({
    secret: 'This is a secret',
    cookie: {
        sameSite:true,
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: false,
    saveUninitialized: false
}));


app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/users',UserRouter);
app.use('/api/food-categories',FoodCategoryRoute);
app.use('/api/foods',FoodRoute);
app.use('/api/drink-categories',DrinkCategoryRoute);
app.use('/api/drinks',DrinkRoute);
app.use('/api/tables',TableRoute)
app.use('/api/auth',AuthRouter);
app.use('/api/orders',OrderRouter)
app.get('/',(req,res)=>{
    res.send("restaurant app api v1")
})

module.exports = app;