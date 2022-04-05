const Comment =require('../Model/Comment')



exports.add = async (req,res) => {
    var comment=new Comment(
        {
            Comment:req.body.Comment,
            Forum:req.body.Forum,
            User:req.body.User,
        }
    );
    try{
        console.log(req.body);
        await comment.save();

        await Comment.findOne({_id:comment._id}).populate('Forum').populate('User').then(Comment=>{
            return res.status(200).json(Comment);
        }).catch(err=>{
            return res.json(err);
        });

    }catch(err){
        res.send(err);

    }
}
exports.getAll = async(req,res) => {
    await Comment.find({}).populate('Forum').populate('User').then(Comment=>{
        return res.status(200).json(Comment);
    }).catch(err=>{
        return res.json(err);
    });
}

exports.findById = async(req,res) => {
    await Comment.findOne({_id:req.params.id}).populate('User').then(Comment=>{
        return res.status(200).json(Comment);
    }).catch(err=>{
        return res.json(err);
    });
}

exports.findByForumId = async(req,res) => {
    await Comment.find({Forum:req.params.id}).populate('User').then(Comment=>{
        return res.status(200).json(Comment);
    }).catch(err=>{
        return res.json(err);
    });
}

exports.update = async(req,res)=>{
    const comment=await Comment.findOne({_id:req.body._id});
    const newComment=await Comment.findByIdAndUpdate(comment._id,req.body).then((Comment)=>{
        return res.status(200).json(newComment);
    }).catch(err=>{
        return res.json(err);
    });
}

exports.delete = async(req,res)=>{
    await Comment.deleteOne({_id:req.params.id})
        .then(()=>{
            res.status(200).json("Comment deleted");
        }).catch(function(error){
            console.log(error);
        });
}
