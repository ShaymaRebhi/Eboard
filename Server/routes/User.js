var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController')
const verify =require('./VerifyToken')
/* GET users listing. */
router.get('/',verify,(req,res)=>{
    res.json({
        Users:{
            title:'hellooo',
            description:'just for test'
        }
    });
})

router.get('/all', UserController.getAll);

router.post('/signup',UserController.signup);

router.post('/login',UserController.signin);
module.exports = router;
