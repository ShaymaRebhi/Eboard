var express = require('express');
var router = express.Router();
const UserController = require('../Controllers/UserController')
const authenticateToken =require('./VerifyToken')
const upload =require('../MiddelWare/Upload')
require('dotenv').config()  

var multer  = require('multer')


/* GET users listing. */
router.get('/connect',authenticateToken,UserController.getUserConnect);

router.get('/all',authenticateToken,UserController.getAll);

router.put('/update/:id',authenticateToken,UserController.UpdateProfile)

router.put('/upload/:id',authenticateToken,upload.single('file'),UserController.UploadFile)

router.delete('/delete/:id',authenticateToken,UserController.DeleteProfile)

router.post('/signup',upload.single('file'),UserController.signup);

router.post('/login',UserController.signin);

router.post('/admin/login',UserController.signinForAdmin);

router.post('/forgetpassword',UserController.forgetPasswordEmailSend);

router.post('/resetpassword',UserController.resetPasswordEmailSend);

router.post('/facebookLogin',UserController.facebookSignin)

router.get('/chat/all/:id',UserController.AllUsersExceptMe);

module.exports = router;
