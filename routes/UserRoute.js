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
const requirePermission = require('../utils/requirePermission');

//delete route for testing purpose
UserRoute.delete('/delete-all/test',DeleteAll);

//register user route
UserRoute.post(
    '/register',
    requirePermission("Manage Users"),
    fileUpload('img/user/').single('img'),
    RegisterUser
);

//fetch all users
UserRoute.get(
    '/', 
    requirePermission("View Users"),
    FetchAllUsers,
);

//fetch a user
UserRoute.get(
    '/:userId',
    requirePermission("View Users"),
    FetchUser
)

//change status of a user
UserRoute.patch(
    '/:userId/change-status',
    requirePermission("Manage Users"),
    ChangeUserStatus,
);

//update user information
UserRoute.patch(
    '/:userId/update',
    requirePermission("Manage Users"),
    fileUpload('img/user/').single('img'), 
    UpdateUser
);

module.exports = UserRoute;