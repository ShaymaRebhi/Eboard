const User =require('../Model/User')
const Student =require('../Model/Student')
const Teacher =require('../Model/Teacher')
const Organization =require('../Model/Organization')
const Admin =require('../Model/Admin')
const jwt = require("jsonwebtoken")
const {loginValidation,signupValidation,StudentAndTeacherValidation}=require('../Validation/Validation.js')

require('dotenv').config()  

exports.getUserConnect = async(req,res) => {
    await User.find({email:req.user.name}).then(User=>{
        if(req.user.role=="STUDENT"){
            Student.find({User:User}).then(Student=>{
                return res.status(200).json(Student);
            })
        }else{
            return res.status(200).json(User);
        }
    }).catch(err=>{
        return res.json(err);
    })
}
exports.getAll = async(req,res) => {
    if(req.user.role=="ADMIN"){
    await User.find({}).then(User=>{
            return res.status(200).json(User);
    }).catch(err=>{
        return res.json(err);
    });
}else{
    return res.status(406).send("Only the admin can display the list of users but you are a "+req.user.role);
}
}

exports.signup = async(req,res) => {
    
    //const {error}=StudentAndTeacherValidation(req.body);
    //const {error1}=StudentAndTeacherValidation(req.body);
    
  // if(error) return res.status(400).send(error.details[0].message);

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
                if(req.body.role=="STUDENT"){
                    req.body.User=data
                    const _student=new Student(req.body)
                    _student.save((error,data)=>{
                        if(error){
                            return res.status(400).json({
                                message : "Something went wrong in student"
                            });
                        }
                    })
                }else if(req.body.role=="TEACHER"){
                    req.body.User=data
                    const _teacher=new Teacher(req.body)
                    _teacher.save((error,data)=>{
                        if(error){
                            return res.status(400).json({
                                message : "Something went wrong in Teacher"
                            });
                        }
                    })
                }else if(req.body.role=="ORGANIZATION"){
                    req.body.User=data
                    const _Organization=new Organization(req.body);
                    _Organization.save((error,data)=>{
                        if(error){
                            return res.status(400).json({
                                message : "Something went wrong in Organization"
                            });
                        }
                    })
                }else{
                    req.body.User=data 
                    const _Admin=new Admin(req.body);
                    _Admin.save((error,data)=>{
                        return res.status(400).json({
                            message : "Something went wrong in Admin"
                        });
                    })
                }
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
            if(!user.Etat && user.role=="ORGANIZATION" || user.role=="TEACHER" ) return res.status(405).send("User not active");
            user.authenticate(req.body.Password).then(data=>{
                if(data){
                    const user1={name:user.email,role:user.role}
                    const token =jwt.sign(user1,process.env.JWT_SECRET,{expiresIn: "1m"});
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


