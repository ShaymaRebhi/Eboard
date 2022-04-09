const User =require('../Model/User')
const Student =require('../Model/Student')
const Teacher =require('../Model/Teacher')
const Organization =require('../Model/Organization')
const Admin =require('../Model/Admin')
const jwt = require("jsonwebtoken")
const {loginValidation}=require('../Validation/Validation.js')
var nodemailer = require('nodemailer');
const _=require("lodash")
const fetch=require('node-fetch')
require('dotenv').config()  
const bcrypt = require('bcrypt');
var async = require('async');

//#######################  AUthentification && signUp  ####################
exports.UploadFile= async(req,res)=>{
    await User.findOne({_id:req.params.id},function(err,user){
        if(err) return res.status(503).json({error:err});
        if (req.file === undefined) return res.status(500).send("you must select a file.");
        const objct={
            file:`https://eboardbackend2022.herokuapp.com/file/${req.file.filename}`,
            fileType:req.file.mimetype
        }
        user=_.extend(user,objct);
        user.save((err,User)=>{
            if(err) return res.status(500).json({error:err})
            if(User)return res.status(200).json(User);
        })

    })
}
exports.signin = async(req,res) => {

    const {error}=loginValidation(req.body);

    if(error) return res.status(400).send(error.details[0].message);
    await User.findOne({
        email : req.body.email            
    }).exec((error,user)=>{
    if(error) return res.status(400).json({ error })
    if(user){
        if(!user.Etat && user.role=="ORGANIZATION" || user.role=="TEACHER" && !user.Etat ) return res.status(408).send("User not active");
        if(user.role=="ADMIN")return res.status(409).send("Error");
        user.authenticate(req.body.Password).then(data=>{
            if(data){
                const user1={name:user.email,role:user.role}
                const token =jwt.sign(user1,process.env.JWT_SECRET,{expiresIn: "1h"});
                res.json({User:user,AccessToken: token})
        
                
            }else{
                return res.status(405).json({message:"Error login !"})
            }
        });
    }  else{
        res.status(402).json({error: "erreur !"});
    }
        
    })
}
exports.signinForAdmin = async(req,res) => {

    const {error}=loginValidation(req.body);

    if(error) return res.status(400).send(error.details[0].message);
    await User.findOne({
        email : req.body.email            
    }).exec((error,user)=>{
    if(error) return res.status(400).json({ error })
    if(user){
        if(user.role!="ADMIN")return res.status(409).send("You are not an admin");
        user.authenticate(req.body.Password).then(data=>{
            if(data){
                const user1={name:user.email,role:user.role}
                const token =jwt.sign(user1,process.env.JWT_SECRET,{expiresIn: "1h"});
                res.json({User:user,AccessToken: token})  
            }else{
                return res.status(405).json({message:"Error login !"})
            }
        });
    }  else{
        res.status(402).json({error: "erreur !"});
    }
        
    })
}
exports.facebookSignin=async(req,res)=>{
    const {userID,AccessToken}=req.body;
    const url = `https://graph.facebook.com/v13.0/${userID}/?fields=name,email,picture,first_name,last_name,gender,birthday,location&locale=en_FR&access_token=${AccessToken}`;
    fetch(url,{
        method:'GET'
    }).then(response=> response.json())
    .then(response=>{
        let Sexe="";
        const { name, email, picture,first_name,last_name,gender,birthday,location } = response;
        if(gender=="male"){
            Sexe="HOMME"
            
        }else{
            Sexe="FEMME"
        }
      
       
     User.findOne({email:email},function(err,user){
            if(err){
               return res.status(400).json({ Error:err+email })
            }else{
                if(user){
                    if(!user.Etat && user.role=="ORGANIZATION" || user.role=="TEACHER" && !user.Etat ) return res.status(408).send("User not active");
                    if(user.role=="ADMIN")return res.status(409).send("Error");
                    const user1={name:user.email,role:user.role}
                    const token =jwt.sign(user1,process.env.JWT_SECRET,{expiresIn: "1h"});
                    res.json({User:user,AccessToken: token})
                }else{
                    console.log(name+" "+email+" "+" "+picture.data.url+" "+first_name+" "+last_name+" "+Sexe+" "+birthday+" "+location.name)
                    let password =bcrypt.hashSync(email + process.env.JWT_SECRET,10);
                    let datas={
                        email:email,
                        password:password,
                        role:"STUDENT",
                        Adresse:location.name,
                        file:picture.data.url
                    }   
                    user = new User(datas);
                    
                    user.save((err, data) => {
                        if (err) {
                          console.log("ERROR FACEBOOK LOGIN ON USER SAVE", err);
                          return res.status(400).json({
                            error: "User signup failed with facebook",
                          });
                        }
                        let StudentDataSet={
                            FirstName:first_name,
                            LastName:last_name,
                            Sexe:Sexe,
                            //BirthDate:birthday,
                            User:data
                        }
                        
                        const _Student=new Student({
                            FirstName:first_name,
                            LastName:last_name,
                            Sexe:Sexe,
                            BirthDate:birthday,
                            Cin:Math.floor(10000000 + Math.random() * 90000000),
                            User:data
                        });
                        _Student.save((error,Student)=>{
                        if(error) return res.status(402).json({Error:"Student error"+error});
                            
                        
                        const user1={name:user.email,role:user.role}
                        const token =jwt.sign(user1,process.env.JWT_SECRET,{expiresIn: "1h"});
                        res.json({User:user,AccessToken: token})
                     })
                  })
                      
                  
                   
                }
    
            }
            
        })
    })

}
exports.signup = async(req,res) => {
  
    await Admin.findOne({Cin:req.body.Cin},function(err,CinCHeck){
    if(CinCHeck && req.body.Cin!=null) return res.status(407).json({message : 'User already registred cin'})
    
    Student.findOne({Cin:req.body.Cin},function(errs,CinStudent){
    if(CinStudent && req.body.Cin!=null) return res.status(407).json({message : 'User already registred cin'})
    
    Teacher.findOne({Cin:req.body.Cin},function(errs,CinTeacher){
        if(CinTeacher && req.body.Cin!=null) return res.status(407).json({message : 'User already registred cin'})
    
    User.findOne({
        email : req.body.email            
    }).exec( (error,user) => {
        if (user ) return res.status(407).json({message : 'User already registred'})
        
    const _user=new User(req.body);
    _user.save((error,User)=>{
        if(error) return res.status(402).json({Error:"Account error"});
        req.body.User=User._id;
    
    if(req.body.role=="ADMIN"){
        if(req.body.Cin==null) return res.status(502).send("Cin invalid");
        const _Admin=new Admin(req.body);
        _Admin.save((error,Admin)=>{
            if(error) return res.status(402).json({Error:"Admin error"+error});
            res.status(200).json(Admin);
        })
    }else if(req.body.role=="ORGANIZATION"){

        const _Organization=new Organization(req.body);

        _Organization.save((error,Organization)=>{
            if(error) return res.status(402).json({Error:"Organization error"+error});
            res.status(200).json(Organization);
        })
    }else if(req.body.role=="TEACHER"){
        if(req.body.Cin==null) return res.status(502).send("Cin invalid");
        const _Teacher=new Teacher(req.body);
        
        _Teacher.save((error,Teacher)=>{
            if(error) return res.status(402).json({Error:"Teacher error"+error});
            res.status(200).json(Teacher);
        })

    }else if(req.body.role=="STUDENT"){
        if(req.body.Cin==null) return res.status(502).send("Cin invalid");
        const _Student=new Student(req.body);

        _Student.save((error,Student)=>{
            if(error) return res.status(402).json({Error:"Student error"+error});
            res.status(200).json(Student);
        })

    }
     });
    });
});
});
});
}
//#########################################################################



//######################## FORGET AND RESET PASSWORD#######################
exports.resetPasswordEmailSend=async(req,res)=>{
    const {resetLink,newPassword} =req.body;
    if(resetLink){
            jwt.verify(resetLink,process.env.JWT_RESET_PASSWORD,function(err,decodedData){
                if(err){
                        return res.status(402).json({error:"Invalid token or it is expired"})
                }
                User.findOne({resetLink},(err,user)=>{
                    if(err || !user){
                        return res.status(400).json({error:"User widh this token does not exist !"})
                    }
                    const obj={
                        password:bcrypt.hashSync(newPassword,10)
                    }

                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                          user: 'eboardlearn@gmail.com',
                          pass: 'zdkkawrucaurhbnd'
                        }
                      });  
                      
                      var mailOptions = {
                        to: user.email,
                        subject: 'Email reseted successfuly !',
                        html: `
                                <h2>Thank you, your password has been reseted successfuly.  </h2>
                        `
                        };
                    user=_.extend(user,obj);
                    user.save((err,result)=>{
                        transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                            return res.status(500).send("Error sending email");
                            } else {
                            return res.status(200).send('Email sent: ' + info.response);
                            }
                        });
                    })
                })
            })
    }else{
     
            return res.status(401).json({error:"Authentication error !"})
        
    }
}
exports.forgetPasswordEmailSend = async(req,res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'eboardlearn@gmail.com',
          pass: 'zdkkawrucaurhbnd'
        }
      });

      User.findOne({email:req.body.email},(err,user)=>{
          if(err || !user){
              return res.status(400).json({error:"User widh this email does not exist !"})
          }
          const token =jwt.sign({email:user.email,Password:user.password},process.env.JWT_RESET_PASSWORD,{expiresIn:'20m'})

          var mailOptions = {
            to: user.email,
            subject: 'Reset password !',
            html: `
                    <h2>Please click on given link to change your password </h2>
                    <p>${process.env.CLIENT_URL}/reset/${token}</p>
            `
            };
      return user.updateOne({resetLink:token},(err,success)=>{
        if(err){
            return res.status(400).json({error:"Reset password link error !"})
        }else{
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                return res.status(500).send("Error sending email");
                } else {
                return res.status(200).send('Email sent: ' + info.response);
                }
            });
        }
      })

    })
}
//#########################################################################


//##################### DELETE AND UPDATE COMPTE###########################
exports.DeleteProfile = async(req,res) => {
    
    await User.findOne({_id:req.params.id}).exec( (error,Userr) => {
       
        if(req.user.role=="STUDENT" && Userr.role!="STUDENT") return res.status(500).send("Sorry you don't have the rights to delete this.");
        if(req.user.role="ORGANIZATION" && Userr.role=="ADMIN")return res.status(500).send("Sorry you don't have the rights to delete this.");
        if(req.user.role="TEACHER" && (Userr.role=="ADMIN" || Userr.role=="ORGANIZATION"))return res.status(500).send("Sorry you don't have the rights to delete this.");

     User.findOneAndRemove({_id:req.params.id},req.body).then(User=>{
        if(!User)return res.status(400).send("User not found");
        if(User.role=="STUDENT"){
            Student.findOneAndRemove({'User':req.params.id},req.body).populate('User').then(Student=>{
                return res.status(200).send("Student deleted");
            })
        }else if(User.role=="ORGANIZATION"){
            
            Organization.findOneAndRemove({'User':req.params.id},req.body).populate('User').then(Organization=>{
                return res.status(200).send("Organization deleted");
            })
        }else if(User.role=="TEACHER"){
            Teacher.findOneAndRemove({'User':req.params.id},req.body).populate('User').then(Teacher=>{
                return res.status(200).send("Teacher deleted");;
            })
        }else if(User.role=="ADMIN"){
            Admin.findOneAndRemove({'User':req.params.id},req.body).populate('User').then(Admin=>{  
                return res.status(200).send("Admin deleted");
            })
        }
    })
    })
    }

exports.UpdateProfile = async(req,res) => {
    await User.findOne({_id:req.params.id}).exec( (error,Userr) => {
       
        if(req.user.role=="STUDENT" && Userr.role!="STUDENT") return res.status(500).send("Sorry you don't have the rights to update this.");
        if(req.user.role="ORGANIZATION" && Userr.role=="ADMIN")return res.status(500).send("Sorry you don't have the rights to update this.");
        if(req.user.role="TEACHER" && (Userr.role=="ADMIN" || Userr.role=="ORGANIZATION"))return res.status(500).send("Sorry you don't have the rights to update this.");

     User.findOneAndUpdate({_id:req.params.id},req.body).then(User=>{
    if(!User)return res.status(400).send("User not found");
    if(User.role=="STUDENT"){
        Student.findOneAndUpdate({'User':req.params.id},req.body).populate('User').then(Student=>{
            return res.status(200).json(Student);
        })
    }else if(User.role=="ORGANIZATION"){
       
        
        Organization.findOneAndUpdate({'User':req.params.id},req.body).populate('User').then(Organization=>{
            return res.status(200).json(Organization);
        })
    }else if(User.role=="TEACHER"){
        Teacher.findOneAndUpdate({'User':req.params.id},req.body).populate('User').then(Teacher=>{
            return res.status(200).json(Teacher);
        })
    }else if(User.role=="ADMIN"){
        Admin.findOneAndUpdate({'User':req.params.id},req.body).populate('User').then(Admin=>{  
            return res.status(200).json(Admin);
        })
    }

})
})
}
//#########################################################################

//#################### Display users ######################################
exports.getUserConnect = async(req,res) => {
    await User.find({email:req.user.name}).then(User=>{
        if(req.user.role=="STUDENT"){
            Student.find({User:User}).populate('User').then(Student=>{
                return res.status(200).json(Student);
            })
        }else if(req.user.role=="ORGANIZATION"){
            Organization.find({User:User}).populate('User').then(Organization=>{
                return res.status(200).json(Organization);
            })
        }else if(req.user.role=="TEACHER"){
            Teacher.find({User:User}).populate('User').then(Teacher=>{
                return res.status(200).json(Teacher);
            })
        }else if(req.user.role=="ADMIN"){
            Admin.find({User:User}).populate('User').then(Admin=>{
                return res.status(200).json(Admin);
            })
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
//#########################################################################

exports.AllUsersExceptMe = async(req,res,next) => {
    try{
        const students=await Student.find({User:{$ne:req.params.id}}).populate({
            path:"User",
            select:["email","file"]
            
        }).select([
            "FirstName","LastName","email","file","_id"
        ]);
        return res.json(students);
    }catch(ex){
        next(ex);
    }

}