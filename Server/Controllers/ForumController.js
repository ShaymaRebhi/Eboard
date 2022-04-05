const Comment =require('../Model/Comment')
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
        res.send(forum);

    }catch(err){
        res.send(err);

    }
}

exports.getAll = async(req,res) => {
    await Forum.find({}).then(Forum=>{
        return res.status(200).json(Forum);
    }).catch(err=>{
        return res.json(err);
    });
}

exports.search = async(req,res) => {
    await Forum.find(
    {$or: [
            {Title: { $regex: '.*' + req.body.search + '.*' }},
            {Description: { $regex: '.*' + req.body.search + '.*' }},
            {Tags: { $regex: '.*' + req.body.search + '.*' }}]
    }).then(Forum=>{
        return res.status(200).json(Forum);
    }).catch(err=>{
        return res.json(err);
    });
}

exports.findById = async(req,res) => {
    await Forum.findOne({_id:req.params.id}).then(Forum=>{
        return res.status(200).json(Forum);
    }).catch(err=>{
        return res.json(err);
    });
}

exports.update = async(req,res)=>{
    const forum=await Forum.findOne({_id:req.body._id});
    await Forum.findByIdAndUpdate(forum._id,req.body)
    await Forum.findOne({_id:forum._id}).then((f)=>{
        return res.status(200).json(f);
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
