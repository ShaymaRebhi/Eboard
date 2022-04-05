const Comment =require('../Model/Comment')
const Forum =require('../Model/Forum')
const Like =require('../Model/Like')



exports.add = async (req,res) => {
    var comment=new Comment(
        {
            Comment:req.body.Comment,
            Forum:req.body.Forum,
            User:req.body.User,
        }
    );
    try{

        let forum = await  Forum.findOne({_id:req.body.Forum});

        forum.Comments.push(comment);
        let updatedforum  =await forum.save();
        await comment.save();
        await Comment.findOne({_id:comment._id}).populate('User').then(Comment=>{
            console.log(Comment);
            res.json(Comment);
        }).catch(err=>{
            res.json(err);
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
    await Comment.find({Forum:req.params.id}).populate('User').populate('Likes').then(Comment=>{
        return res.status(200).json(Comment);
    }).catch(err=>{
        return res.json(err);
    });
}

exports.update = async(req,res)=>{
    const comment=await Comment.findOne({_id:req.body._id});
    const newComment=await Comment.findByIdAndUpdate(comment._id,req.body);
    await Comment.findOne({_id:req.body._id}).populate('User').populate('Likes').then((Comment)=>{
        return res.status(200).json(Comment);
    }).catch(err=>{
        return res.json(err);
    });
}

exports.delete = async(req,res)=>{
    const comment=await Comment.findOne({_id:req.params.id});
    const forum =await Forum.findOne({_id:comment.Forum})
    forum.Comments.pull({_id:comment._id});
    await forum.save();
    await Comment.deleteOne({_id:req.params.id});
    res.send('comment delete')

}

exports.like = async (req,res) => {

    var like=new Like(
        {
            Comment:req.body.Comment,
            User:req.body.User,
        }
    );
    try{

        let comment = await  Comment.findOne({_id:req.body.Comment});

        comment.Likes.push(like);
        let updatedComment  =await comment.save();
        await like.save();
        await Comment.findOne({_id:comment._id}).populate('User').populate('Likes').then(Comment=>{
            res.json(Comment);
        }).catch(err=>{
            res.json(err);
        });

    }catch(err){
        res.send(err);

    }
}
