const Student =require('../Model/Student')
const Organization =require('../Model/Organization')
const _=require("lodash")

exports.getAll= async (req,res) =>{

    Student.find({}).populate('User').populate('Organization').then(student=>{
        if(!student) return res.status(500).json({error:'error'});
        return res.status(200).json(student);
       
    }) 
}



exports.affecterToOrganization=async (req,res)=>{
    Organization.findOne({_id:req.params.idOrg},(err,organization)=>{
        if(err) return res.status(500).json({error:"Organization not found"});
        Student.findOne({_id:req.params.idStudent},(err,student)=>{
            if(err) return res.status(500).json({error:"Student not found"});
    
            const objct={
                Organization:req.params.idOrg
            }
            student=_.extend(student,objct);
            student.save((err,stud)=>{
                if(err) return res.status(500).json({error:err})
                if(stud)return res.status(200).json(stud);
            })
        })
    })
}

exports.deleteOrganizationFromStudent=async (req,res)=>{
    Student.findOne({_id:req.params.idStudent},(err,student)=>{
        if(err) return res.status(500).json({error:"Student not found"});
        const objct={
            Organization:null
        }
        student=_.extend(student,objct);
        student.save((err,stud)=>{
            if(err) return res.status(500).json({error:err})
            if(stud)return res.status(200).json(stud);
        })
    })

}