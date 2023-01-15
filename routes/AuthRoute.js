const express = require('express');
const { 
    Logout, 
    Login 
} = require('../controllers/AuthControllers');
const AuthRouter = express.Router();

AuthRouter.post('/login',Login)

AuthRouter.post('/logout',Logout)

module.exports = AuthRouter;