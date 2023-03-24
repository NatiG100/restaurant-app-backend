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
const ApplicationSettingRouter = require('./routes/ApplicationSettingRoute');
const {createServer} = require('http');
const {Server} = require("socket.io");
const NotificationRoute = require('./routes/NotificationRoute');
const StatRoute = require('./routes/StatRoute');


var store = new MongoDBStore({
    uri:MONGO_DB_CONNECTION+"/restaurant-menu",
    collection:'mySessions',
    expires:1000 * 60 * 60 * 24 * 7,
})
store.on('error',function(error){
    console.log(error);
});
var whitelist = [
    'http://localhost:3000',
    'http://192.168.1.10:3000',
    'http://172.20.44.133:3000',
    'http://172.20.101.38:3000'
]
const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors:{
        origin:'http://localhost:3000',
        credentials:true
    }
});
app.io = io;

app.use(cors({
    credentials:true,
    origin: 'http://localhost:3000'
}));
app.use(express.static('public'));

const sessionMiddleware = session({
    name:"SESSION_DB",
    secret: 'This is a secret',
    store: store,
    saveUninitialized: false,
    resave: false,
    cookie: {
        sameSite:false,
        secure: process.env.NODE_ENV==="production",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        httpOnly:true,
    },
});
app.use(sessionMiddleware);

app.use(bodyParser.json());

app.post('/api/test',(req,res,next)=>{
    console.log("emit");
    req.io.emit("event",{data:40,message:"this is an event"});
    res.json({data:[],message:"success"});
})
app.use('/api/stat',StatRoute);
app.use('/api/notifications',NotificationRoute);
app.use('/api/users',UserRouter);
app.use('/api/food-categories',FoodCategoryRoute);
app.use('/api/foods',FoodRoute);
app.use('/api/drink-categories',DrinkCategoryRoute);
app.use('/api/drinks',DrinkRoute);
app.use('/api/tables',TableRoute)
app.use('/api/auth',AuthRouter);
app.use('/api/orders',OrderRouter);
app.use('/api/setting',ApplicationSettingRouter);
app.get('/',(req,res)=>{
    res.send("restaurant app api v1")
})

module.exports = httpServer;