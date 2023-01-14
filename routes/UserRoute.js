const express = require('express');
const router = express.Router();

const { 
    RegisterUser, 
    FetchAllUsers, 
    FetchUser, 
    ChangeUserStatus, 
    UpdateUser, 
    DeleteAll 
} = require('../controllers/UserControllers');

//delete route for testing purpose
router.delete('/delete-all/test',DeleteAll);

//register user route
router.post('/register',RegisterUser);

//fetch all users
router.get('/', FetchAllUsers);

//fetch a user
router.get('/:userId',FetchUser)

//change status of a user
router.patch('/:userId/change-status',ChangeUserStatus)

//update user information
router.patch('/:userId/update', UpdateUser)

module.exports = router;