const express = require('express');
const { 
    Logout, 
    Login, 
    WhoAmI
} = require('../controllers/AuthControllers');
const AuthRouter = express.Router();

AuthRouter.post('/login',Login);

AuthRouter.post('/logout',Logout);

AuthRouter.get('/who-am-i',WhoAmI);

module.exports = AuthRouter;