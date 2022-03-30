const Question = require('../Model/QuestionQuiz');


exports.GetQuestion = async (req,res,next) =>{
    try {
        Question.find().then(()=>res.json(Question));

    } catch (error) {
        res.status(404).json({message : error.message});
    }
}

exports.DeleteQuestion = async (req,res) =>{
    Question.deleteOne({ _id: req.params.id })
        .then(deleteConfirmation => res.json(deleteConfirmation))
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