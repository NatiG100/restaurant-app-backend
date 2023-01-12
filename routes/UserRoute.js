const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('all users')
})
router.get('/:userId',(req,res)=>{
    res.send('get single user')
})
router.post('/register',(req,res)=>{
    res.send('register');
})

router.patch('/change-status/:userId',(req,res)=>{
    res.send('change status')
})

router.patch('/update/:userId',(req,res)=>{
    res.send('Update user')
})

module.exports = router;