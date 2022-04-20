const Reclamation = require('../Model/Reclamation');
const User =require('../Model/User');
var nodemailer = require('nodemailer');
require('dotenv').config();

exports.add=async(req,res)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'eboardlearn@gmail.com',
          pass: 'umhfeidsyelslwut'
        }
      });
      
    await User.findOne({
        _id : req.params.id            
    }).exec( (error,User) => {
        if(!User) return res.status(500).send("you have an error please try again");
        var mailOptions = {
            to: User.email,
            subject: 'Reclamation saved !',
            html: `
                    <h1><b>E-BOARD</b></h1>
                    <h2>Reclamation</h2>
                    <p>Hi, your reclamation has been saved succssefuly, thank you </p><br/><br/>
                    
                    
            `
            };
            
            req.body.User=User;
            const _Reclamation=new Reclamation(req.body);
            _Reclamation.save((err,Reclamation)=>{
                if(err) return res.status(501).send("error saving data");
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {return res.status(500).send("Error sending email");} 
                });
                return res.status(200).send("data saved successfuly !!");
            })
    });

};

exports.all=async(req,res)=>{

await Reclamation.find({}).populate('User').exec( (error,Reclamation) => {
    if(error) return res.status(504).send("Error");
    return res.status(200).json(Reclamation);
})

}

exports.delete=async(req,res)=>{
    await Reclamation.findByIdAndRemove({_id:req.params.id}).exec((error,data)=>{
        if(error) return res.status(508).send("error "+error);
        return res.status(200).send("Deleted successfyly !!");
    })
}