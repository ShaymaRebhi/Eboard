const User =require('../Model/User')
const Student =require('../Model/Student')
const Teacher =require('../Model/Teacher')
const Organization =require('../Model/Organization')

const Reclamation=require('../Model/Reclamation')
const Admin =require('../Model/Admin')
const jwt = require("jsonwebtoken")
const {loginValidation}=require('../Validation/Validation.js')
var nodemailer = require('nodemailer');
const _=require("lodash")
const fetch=require('node-fetch')
const {OAuth2Client} =require('google-auth-library');
const client=new OAuth2Client('429109744769-u70gtp3oelkd79pphuh4gblmm5ajaa2u.apps.googleusercontent.com');
require('dotenv').config()  
const bcrypt = require('bcrypt');
var async = require('async');
const axios = require('axios');
const urlToGetLinkedInAccessToken = 'https://www.linkedin.com/oauth/v2/accessToken';
const urlToGetUserProfile ='https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))'
const urlToGetUserEmail = 'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))';
const qs = require('query-string');
//#######################  AUthentification && signUp  ####################
exports.loginLinkedin=async(req,res)=>{
        const user = {};
        const code = req.body.code;
        
    console.log(getAccessToken(code))
    let accessToken = null;
    const config = {
      headers: { "Content-Type": 'application/x-www-form-urlencoded' }
    };
    
    const parameters = {
      "grant_type": "authorization_code",
      "code": code,
      "redirect_uri": "http://localhost:3001/linkedin",
      "client_id": "78k73vnm4gj65z",
      "client_secret": "HDxcomZwd1Lv2vDI",
    };
    axios.post(
        urlToGetLinkedInAccessToken,
        qs.stringify(parameters),
        config)
      .then(response => {
         
        accessToken = response.data.access_token;
      
       
          axios.get("https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))", {
                headers: {
                  "Authorization": `Bearer ${accessToken}`
                }
              })
            .then((responsess) => {
              
              console.log(responsess.elements[0]['handle~'].emailAddress)
            })
            .catch((error) => console.log("Error getting user email"))
       
        if(accessToken === null) {
          return res.status(502).send("error");
        }
        // Here, you can implement your own login logic 
        // to authenticate new user or register him
        res.status(200).json("hhhhh");
    }).catch((err)=>{
        return res.status(503).send("error"+err);
    })
}
function getAccessToken(code) {
    let accessToken = null;
    const config = {
      headers: { "Content-Type": 'application/x-www-form-urlencoded' }
    };
    
    const parameters = {
      "grant_type": "authorization_code",
      "code": code,
      "redirect_uri": "http://localhost:3001/linkedin",
      "client_id": "78k73vnm4gj65z",
      "client_secret": "HDxcomZwd1Lv2vDI",
    };
    axios.post(
        urlToGetLinkedInAccessToken,
        qs.stringify(parameters),
        config)
      .then(response => {
         
        accessToken = response.data.access_token;
      })
      .catch(err => {
        console.log("Error getting LinkedIn access token"+err);
      })
      return accessToken;
  }
function userBuilder(userProfile, userEmail) {
    return {
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      profileImageURL: userProfile.profileImageURL,
      email: userEmail
    }
  }
function getUserProfile(accessToken) {
    let userProfile = null;
    const config = {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    }
    axios
      .get("https://api.linkedin.com/v2/me", config)
      .then(response => {
        console.log(response)
        // I mean, couldn't they have burried it any deeper?
      })
      .catch(error => console.log("Error grabbing user profile"+error))
    return userProfile;
  }
  function getUserEmail(accessToken) {
    const email = null;
    const config = {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    };
    axios
      .get(urlToGetUserEmail, config)
      .then(response => {
        email = response.data.elements[0]["handle~"];
      })
      .catch(error => console.log("Error getting user email"))
  
    return email;
  }
exports.UploadFile= async(req,res)=>{
    await User.findOne({_id:req.params.id},function(err,user){
        if(err) return res.status(503).json({error:err});
        if (req.file === undefined) return res.status(500).send("you must select a file.");
        const objct={
            file:`http://localhost:3000/file/${req.file.filename}`,
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
        if(!user.emailVerification || user.emailVerification==null) return res.status(553).json({error:"account not active"});
        if((!user.Etat ) && user.role=="ORGANIZATION" || user.role=="TEACHER" && !user.Etat ) return res.status(408).send("User not active");
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
exports.gmailSignin=async(req,res)=>{
    const {tokenId}=req.body;
    client.verifyIdToken({idToken:tokenId,audience:"429109744769-u70gtp3oelkd79pphuh4gblmm5ajaa2u.apps.googleusercontent.com"}).then(response=>{
        const {email_verified,given_name,family_name,email,picture}=response.payload;
            if(email_verified){
                User.findOne({email:email},function(err,user){
                    if(!user.emailVerification) return res.status(553).json({error:"account not active"});
                    if(err)res.status(500).json({error:err});
                    if(user){
                        if(!user.Etat && user.role=="ORGANIZATION" || user.role=="TEACHER" && !user.Etat ) return res.status(408).send("User not active");
                        if(user.role=="ADMIN")return res.status(409).send("Error");
                        const user1={name:user.email,role:user.role}
                        const token =jwt.sign(user1,process.env.JWT_SECRET,{expiresIn: "1h"});
                        res.json({User:user,AccessToken: token})
                    }else{
                        res.status(523).send("compte n'existe pas !!");
                    }
                })
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
                    if(!user.emailVerification)return  res.status(553).json({error:"account not active"});
                    if(!user.Etat && user.role=="ORGANIZATION" || user.role=="TEACHER" && !user.Etat ) return res.status(408).send("User not active");
                    if(user.role=="ADMIN")return res.status(409).send("Error");
                    const user1={name:user.email,role:user.role}
                    const token =jwt.sign(user1,process.env.JWT_SECRET,{expiresIn: "1h"});
                    res.json({User:user,AccessToken: token})
                }else{
                    let password =bcrypt.hashSync(email + process.env.JWT_SECRET,10);
                    let datas={
                        email:email,
                        password:password,
                        role:"STUDENT",
                        Adresse:"",
                        file:picture.data.url
                    }   
                    user = new User(datas);
                    
                    user.save((err, data) => {
                        if (err) return res.status(400).json({error: "User signup failed with facebook"});
                        

                        //email here 
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                              user: 'eboardlearn@gmail.com',
                              pass: 'umhfeidsyelslwut'
                            }
                          });

                          const token1 =jwt.sign({email:email,Password:data.password},process.env.VERIFEMAIL,{expiresIn:'7d'})
                            var mailOptions = {
                                to: datas.email,
                                subject: 'Activate account !',
                                html: `
                                        <h1><b>E-BOARD</b></h1><br/><br/>
                                        <h2>Activate your account</h2>
                                        <p>Hi, you've created a new customer account at E-BOARD. All you have to do is activate it. </p><br/><br/>
                                        <a href='${process.env.CLIENT_URL}/verif/${token1}' >Activate your account</a> or <a href='${process.env.CLIENT_URL}' >Visit our plateforme</a>
                                        
                                `
                                };
                                User.updateOne({activateLink:token1},(err,success)=>{
                                    if(err){
                                        return res.status(401).json({error:"Reset password link error !"})
                                    }else{
                                        transporter.sendMail(mailOptions, function(error, info){
                                            if (error) {
                                            return res.status(500).send("Error sending email");
                                            } else {
                                            return res.status(200).send('Email sent: ' + info.response);
                                            }
                                        });
                                    }
                                  }).catch(err=>{
                                    return res.status(508).send(err);
                                  })

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
                        if(user.emailVerification){
                            res.status(200).json({User:user,AccessToken: token})
                        }else{
                            res.status(553).json({error:"account not active"})
                        }
                        
                     })
                  })
                      
                  
                   
                }
    
            }
            
        })
    })

}
exports.signup = async(req,res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'eboardlearn@gmail.com',
          pass: 'umhfeidsyelslwut'
        }
      });
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
        const token =jwt.sign({email:req.body.email,Password:req.body.Password},process.env.VERIFEMAIL,{expiresIn:'7d'})
        var mailOptions = {
            to: req.body.email,
            subject: 'Activate account !',
            html: `
                    <h1><b>E-BOARD</b></h1><br/><br/>
                    <h2>Activate your account</h2>
                    <p>Hi, you've created a new customer account at E-BOARD. All you have to do is activate it. </p><br/><br/>
                    <a href='${process.env.CLIENT_URL}/verif/${token}' >Activate your account</a> or <a href='${process.env.CLIENT_URL}' >Visit our plateforme</a>
                    
            `
            };
            User.updateOne({activateLink:token},(err,success)=>{
                if(err){
                    return res.status(401).json({error:"Reset password link error !"})
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
exports.activateAccount=async(req,res)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'eboardlearn@gmail.com',
          pass: 'umhfeidsyelslwut'
        }
      });
    const {activateLink} =req.body;
      if(activateLink){
        jwt.verify(activateLink,process.env.VERIFEMAIL,function(err,decodedData){
            if(err){
                return res.status(402).json({error:"Invalid token or it is expired"})
            }
            User.findOne({activateLink},(err,user)=>{
                if(err || !user){
                    return res.status(400).json({error:"User widh this token does not exist !"})
                }
                const obj={
                    emailVerification:true
                }
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'eboardlearn@gmail.com',
                      pass: 'umhfeidsyelslwut'
                    }
                  });  
                  
                  var mailOptions = {
                    to: user.email,
                    subject: 'Account actived !',
                    html: `
                            <h2>Thank you, your account has been activated successfuly.  </h2>
                    `
                    };
                    user=_.extend(user,obj);
                    user.save((err,result)=>{
                        transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                            return res.status(500).send("Error sending email");
                            } else {
                            return res.status(200).json(user);
                            }
                        });
                    })
            })
        })
      }

}
//#########################################################################



//######################## FORGET AND RESET PASSWORD#######################
exports.AdminresetPasswordEmailSend=async(req,res)=>{
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
                    if(user.role!="ADMIN")return res.status(545).json({error:"error"});
                    const obj={
                        password:bcrypt.hashSync(newPassword,10)
                    }

                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                          user: 'eboardlearn@gmail.com',
                          pass: 'umhfeidsyelslwut'
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
                          pass: 'umhfeidsyelslwut'
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
exports.AdminforgetPasswordEmailSend = async(req,res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'eboardlearn@gmail.com',
          pass: 'umhfeidsyelslwut'
        }
      });
      console.log(req.body.email)
      User.findOne({email:req.body.email},(err,user)=>{

          if(err || !user){
              console.log(req.body.email)
              return res.status(402).json({error:"User widh this email does not exist !"})
          }
          if(user.role!="ADMIN")return res.status(545).json({error:"error"});
          const token =jwt.sign({email:user.email,Password:user.password},process.env.JWT_RESET_PASSWORD,{expiresIn:'20m'})

          var mailOptions = {
            to: user.email,
            subject: 'Reset password !',
            html: `
                    <h2>Please click on given link to change your password </h2>
                    <p>${process.env.CLIENT_URL}/Adminreset/${token}</p>
            `
            };
        return user.updateOne({resetLink:token},(err,success)=>{
        if(err){
            return res.status(401).json({error:"Reset password link error !"});
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
exports.forgetPasswordEmailSend = async(req,res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'eboardlearn@gmail.com',
          pass: 'umhfeidsyelslwut'
        }
      });

      User.findOne({email:req.body.email},(err,user)=>{

          if(err || !user){
              console.log(req.body.email)
              return res.status(402).json({error:"User widh this email does not exist !"})
          }
          if(user.role=="ADMIN")return res.status(545).json({error:"error"});
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
            return res.status(401).json({error:"Reset password link error !"})
        }else{
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                return res.status(500).send("Error sending email");
                } else {
                return res.status(200).send('Email sent: ' + info.response);
                }
            });
        }
      }).catch(err=>{
        console.log(err);
    })

    }).catch(err=>{
        console.log(err);
    })
}
//#########################################################################


//##################### DELETE AND UPDATE COMPTE###########################
exports.DeleteProfile = async(req,res) => {
    
    await User.findOne({_id:req.params.id}).exec( (error,Userr) => {
       
        if(req.user.role=="STUDENT" && (Userr.role!="STUDENT" && Userr.role!="ADMIN")) return res.status(500).send("Sorry you don't have the rights to delete this.");
        if(req.user.role=="ORGANIZATION" && (Userr.role=="ADMIN" && Userr.role!="ORGANIZATION"))return res.status(500).send("Sorry you don't have the rights to delete this.");
        if(req.user.role=="TEACHER" && (Userr.role!="ADMIN" && Userr.role=="ORGANIZATION"))return res.status(505).send("Sorry you don't have the rights to delete this.");

     User.findOneAndRemove({_id:req.params.id},req.body).then(User=>{
        if(!User)return res.status(400).send("User not found");
        Reclamation.findOneAndRemove({'User':req.params.id}).then(rec=>{

        
        if(User.role=="STUDENT"){
            Student.findOneAndRemove({'User':req.params.id},req.body).populate('User').then(Student=>{
                return res.status(200).send("Student deleted");
            }).catch(err=>{
                return res.status(500).send(err);
            })
        }else if(User.role=="ORGANIZATION"){
            
            Organization.findOneAndRemove({'User':req.params.id},req.body).populate('User').then(Organization=>{
                return res.status(200).send("Organization deleted");
            }).catch(err=>{
                return res.status(500).send(err);
            })
        }else if(User.role=="TEACHER"){

            Teacher.findOneAndRemove({'User':req.params.id},req.body).populate('User').then(Teacher=>{

                return res.status(200).send("Teacher deleted");

            }).catch(err=>{
                return res.status(500).send(err);
            })
        }else if(User.role=="ADMIN"){
            Admin.findOneAndRemove({'User':req.params.id},req.body).populate('User').then(Admin=>{  
                return res.status(200).send("Admin deleted");
            }).catch(err=>{
                return res.status(500).send(err);
            })
        }
    }).catch(err=>{
        return res.status(500).send(err);
    })
    })
})
    }

exports.UpdateProfile = async(req,res) => {
    await User.findOne({_id:req.params.id}).exec( (error,Userr) => {
       
        if(req.body.role=="STUDENT" && (Userr.role!="STUDENT"&& Userr.role!="ADMIN")) return res.status(501).send("Sorry you don't have the rights to update this.");
        if(req.body.role=="ORGANIZATION" && (Userr.role!="ORGANIZATION" && Userr.role!="ADMIN"))return res.status(502).send("Sorry you don't have the rights to update this.");
        if(req.body.role=="TEACHER" && (Userr.role!="TEACHER" && Userr.role!="ADMIN"))return res.status(503).send("Sorry you don't have the rights to update this.");

     User.findOneAndUpdate({_id:req.params.id},req.body).then(User=>{
    if(!User)return res.status(400).send("User not found");
    if(User.role=="STUDENT"){
        Student.findOneAndUpdate({'User':req.params.id},req.body).populate('User').then(Student=>{
            return res.status(200).json(Student);
        }).catch(err=>{
            return res.status(508).send(err);
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
      
        if(req.params.role=="STUDENT"){
            const students=await Student.find({User:{$ne:req.params.id}}).populate({
                path:"User",
                select:["email","file"]
                
            }).select([
                "FirstName","LastName","email","file","_id"
            ]);
            return res.status(200).json(students);
        }else if(req.params.role=="TEACHER"){
            const teachers=await Teacher.find({User:{$ne:req.params.id}}).populate({
                path:"User",
                select:["email","file"]
                
            }).select([
                "FirstName","LastName","email","file","_id"
            ]);
            return res.status(200).json(teachers);
        }
        return res.status(200).json(null);
    }catch(ex){
        next(ex);
    }

}


exports.GetNumberStudent=async (req,res)=>{

    try {
        User.find({
            role:"STUDENT"
        }).count().then((number)=>res.json(number))
    }
    catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.GetNumberTeacher=async (req,res)=>{

    try {
        User.find({
            role:"TEACHER"
        }).count().then((number)=>res.json(number))
    }
    catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.GetNumberOrganization=async (req,res)=>{

    try {
        User.find({
            role:"ORGANIZATION"
        }).count().then((number)=>res.json(number))
    }
    catch (error) {
        res.status(404).json({message: error.message});
    }
}


