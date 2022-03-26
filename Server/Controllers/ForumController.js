const User =require('../Model/User')
const Forum =require('../Model/Forum')
const {loginValidation}=require('../Validation/Validation.js')



exports.add = async (req,res) => {
    var forum=new Forum(
        {
            Title:req.body.Title,
            Description:req.body.Description,
            Tags:req.body.Tags,
            User:req.body.User,
        }
    );
    try{
        console.log(req.body);
        await forum.save();
        res.send("Forum added");

    }catch(err){
        res.send(err);

    }
}
exports.getAll = async(req,res) => {
    await Forum.find({}).populate('User').then(Forum=>{
        return res.status(200).json(Forum);
    }).catch(err=>{
        return res.json(err);
    });
}

exports.findById = async(req,res) => {
    await Forum.findOne({_id:req.params.id}).populate('User').then(Forum=>{
        return res.status(200).json(Forum);
    }).catch(err=>{
        return res.json(err);
    });
}

exports.delete = async(req,res)=>{
    await Forum.deleteOne({_id:req.params.id})
        .then(()=>{
            res.status(200).json("forum deleted");
            console.log("forum deleted");
        }).catch(function(error){
            console.log(error);
        });
}
