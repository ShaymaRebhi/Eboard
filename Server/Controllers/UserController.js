const User =require('../Model/User')
const jwt = require("jsonwebtoken")
const {loginValidation,signupValidation}=require('../Validation/Validation.js')

require('dotenv').config()  

exports.getUserConnect = async(req,res) => {
    await User.find({email:req.user.name}).then(User=>{
        return res.status(200).json(User);
        
    }).catch(err=>{
        return res.json(err);
    })
}
exports.getAll = async(req,res) => {
    await User.find({}).then(User=>{
        return res.status(200).json(User);
        
    }).catch(err=>{
        return res.json(err);
    })
}

exports.signup = async(req,res) => {
    
    const {error}=signupValidation(req.body);

   if(error) return res.status(400).send(error.details[0].message);

    await User.findOne({
        email : req.body.email            
    }).exec( (error,user) => {
        if (user ) return res.status(400).json({
            message : 'User already registred'
        })
        const _user = new User(req.body);
          _user.save((error,data) => {
            if(error){
                return res.status(400).json({
                    message : "Something went wrong"
                });
            }else if(data){
                return res.status(200).json(data);
            }
        })
    }) // add user 


}

    exports.signin = async(req,res) => {

        const {error}=loginValidation(req.body);

        if(error) return res.status(400).send(error.details[0].message);

        await User.findOne({
            email : req.body.email            
        }).exec((error,user)=>{
        if(error) return res.status(400).json({ error })
        if(user){
            
            user.authenticate(req.body.Password).then(data=>{
                if(data){
                    const user1={name:user.email}
                    const token =jwt.sign(user1,process.env.JWT_SECRET);
                    res.json({AccessToken: token})
            
                    
                }else{
                    return res.status(405).json({message:"Error login !"})
                }
            });
        }  else{
            res.status(402).json({error: "erreur !"});
        }
            
        })
    }


