const Quiz = require('../Model/Quiz')
const Option = require('../Model/Option')
const Question = require('../Model/QuestionQuiz')


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
