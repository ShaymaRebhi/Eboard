const Quiz = require('../Model/Quiz')
const Option = require('../Model/Option')
const Question = require('../Model/QuestionQuiz')

exports.GetQuiz = async (req,res,next) =>{
    try {
        Quiz.find().then((Quiz)=>res.json(Quiz));

    } catch (error) {
        res.status(404).json({message : error.message});
    }
}
exports.deleteQuiz = async (req,res) =>{
    Quiz.deleteOne({ _id: req.params.id })
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.status(400).json(err));
}



exports.AddQuiz = async(req,res)=>{

    const _Option = new Option({
        OptionText : req.body.OptionText,
        IsValid :req.body.IsValid
    });

   await _Option.save();
    const optionID = [_Option._id];
    const _Question = new Question({
        questionText : req.body.questionText,
        Required :req.body.Required,
        Score :req.body.Score,
        Options :optionID,
    });

    await _Question.save();
    const questionID = _Question._id;
    const _Quiz = new Quiz({
        Title : req.body.Title,
        Class :req.body.Class,
        Description :req.body.Description,
        Questions :questionID,
    });
    await _Quiz.save((err, quiz) => {
                        if (err) return res.status(503).json({error: err});
                        if (quiz) return res.status(200).json({
                            success:true,
                            id:quiz._id,
                            message:'quiz Created',
                        });
    })
}
