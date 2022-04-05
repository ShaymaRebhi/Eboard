const Reclamation = require('../Model/Reclamation');
const User =require('../Model/User');
require('dotenv').config();

exports.add=async(req,res)=>{

    await User.findOne({
        _id : req.params.id            
    }).exec( (error,User) => {
        if(!User) return res.status(500).send("you have an error please try again");
            req.body.User=User;
            const _Reclamation=new Reclamation(req.body);
            _Reclamation.save((err,Reclamation)=>{
                if(err) return res.status(501).send("error saving data");
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