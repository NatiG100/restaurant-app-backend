const express = require('express');
const UserRoute = express.Router();

const { 
    RegisterUser, 
    FetchAllUsers, 
    FetchUser, 
    ChangeUserStatus, 
    UpdateUser, 
    DeleteAll 
} = require('../controllers/UserControllers');
const fileUpload = require('../utils/fileUpload');

//delete route for testing purpose
UserRoute.delete('/delete-all/test',DeleteAll);

//register user route
UserRoute.post('/register',fileUpload('img/user/').single('img'),RegisterUser);

//fetch all users
UserRoute.get('/', FetchAllUsers);

//fetch a user
UserRoute.get('/:userId',FetchUser)

//change status of a user
UserRoute.patch('/:userId/change-status',ChangeUserStatus)

//update user information
UserRoute.patch('/:userId/update',fileUpload('img/user/').single('img'), UpdateUser)

module.exports = UserRoute;