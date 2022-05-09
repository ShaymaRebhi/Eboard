const Teacher =require('../Model/Teacher')
const Organization =require('../Model/Organization')
const _=require("lodash")


exports.getAll= async (req,res) =>{

    Teacher.find({}).populate('User').populate('Organization').then(teacher=>{
        if(!teacher) return res.status(500).json({error:'error'});
        return res.status(200).json(teacher);
    }).catch(err=>{
        console.log(err);
    }) 
}

exports.getUserById=async(req,res)=>{
    Teacher.find({_id:req.params.id}).populate('User').then(teacher=>{
       if(!teacher) return res.status(520).send("error");
       return res.status(200).json(teacher);
   }).catch(err=>{
        return res.status(500).send("error");
   })
}

exports.affecterToOrganization=async (req,res)=>{
    Organization.findOne({_id:req.params.idOrg},(err,organization)=>{
        if(err) return res.status(500).json({error:"Organization not found"});
        Teacher.findOne({_id:req.params.idTeach},(err,teacher)=>{
            if(err) return res.status(500).json({error:"Teacher not found"});
    
            const objct={
                Organization:req.params.idOrg
            }
            teacher=_.extend(teacher,objct);
            teacher.save((err,teach)=>{
                if(err) return res.status(500).json({error:err})
                if(teach)return res.status(200).json(teach);
            })
        }).catch(err=>{
            console.log(err);
        })
    })
}

exports.deleteOrganizationFromStudent=async (req,res)=>{
    Teacher.findOne({_id:req.params.idTeach},(err,teacher)=>{
        if(err) return res.status(500).json({error:"teacher not found"});
        const objct={
            Organization:null
        }
        teacher=_.extend(teacher,objct);
        teacher.save((err,teach)=>{
            if(err) return res.status(500).json({error:err})
            if(teach)return res.status(200).json(teach);
        })
    }).catch(err=>{
        console.log(err);
    })

}