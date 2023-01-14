const express = require('express');
const router = express.Router();
const path = require('path');
const uuid= require('uuid');
const multer = require('multer');
const storage = multer.diskStorage({
    destination:path.join(path.dirname(require.main.filename),'/public/img/user'),
    filename: function (req,file,cb){
        req.uploadedFileName = uuid.v4()+path.extname(file.originalname);
        cb(null,req.uploadedFileName);
        req.uploadedFileName = "/img/user/"+req.uploadedFileName;
    }
});

var upload = multer({storage:storage});

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
router.post('/register',upload.single('img'),RegisterUser);

//fetch all users
router.get('/', FetchAllUsers);

//fetch a user
router.get('/:userId',FetchUser)

//change status of a user
router.patch('/:userId/change-status',ChangeUserStatus)

//update user information
router.patch('/:userId/update', UpdateUser)

module.exports = router;