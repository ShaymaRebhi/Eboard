const Question = require('../Model/QuestionQuiz');


exports.GetQuestion = async (req,res,next) =>{
    try {
        Question.find().then((Question)=>res.json(Question));

    } catch (error) {
        res.status(404).json({message : error.message});
    }
}
exports.GetOneQuestion = async(req,res) => {
    await Question.findOne({_id:req.params.id})
        .then(Question=>{
        return res.status(200).json(Question);
    }).catch(err=>{
        return res.json(err);
    });
}

exports.DeleteQuestion = async (req,res) =>{
    Question.deleteOne({ _id: req.params.id })
        .then(res.status(200).send(`Question is succussffully deleted`))
        .catch(err => res.status(400).json(err));
}
exports.AddQuestion = async(req,res) => {
    const newQuestion = new Question(req.body)
    await newQuestion.save((err, question) => {
        if (err) return res.status(503).json({error: err});
        if (question) return res.status(200).json({
            success: true,
            id: question._id,
            message: 'question Created',
        });
    })
}
exports.updateQuestion = async(req,res)=>{
    const question =  await Question.findOne({_id:req.body._id});
    const newQuestion=await Question.findByIdAndUpdate(question._id,req.body).then((Question)=>{
        return res.status(200).send(`Question is succussffully Updated`);
    }).catch(err=>{
        return res.json(err);
    });
}