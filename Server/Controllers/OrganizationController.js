const Teacher =require('../Model/Teacher')
const Organization =require('../Model/Organization')
const _=require("lodash")


exports.getAll= async (req,res) =>{

    Organization.find({}).populate('User').then(organization=>{
        if(!organization) return res.status(500).json({error:'error'});
        return res.status(200).json(organization);
    }).catch(err=>{
        console.log(err);
    }) 
}

exports.getUserById=async(req,res)=>{
    Organization.find({_id:req.params.id}).populate('User').then(organization=>{
       if(!organization) return res.status(520).send("error");
       return res.status(200).json(organization);
   }).catch(err=>{
        return res.status(500).send("error");
   })
}

