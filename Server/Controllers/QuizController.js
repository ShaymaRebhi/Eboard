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
        .then(res.status(200).send(`Quiz is succussffully deleted`))
        .catch(err => res.status(400).json(err));
}

exports.AddQuiz = async(req,res) => {
    const newQuiz = new Quiz(req.body)
    await newQuiz.save((err, quiz) => {
        if (err) return res.status(503).json({error: err});
        if (quiz) return res.status(200).json({
            success: true,
            id: quiz._id,
            message: 'Quiz Created'
        });
            req.body.User=User._id;
    })
}
exports.updateQuiz = async(req,res)=> {
    Quiz.findById(req.params.id, function (err,quiz){
        if(!quiz)
            res.status(404).send('data is not found');
        else
            quiz.Title = req.body.Title;
            quiz.Theme = req.body.Theme;
            quiz.Description = req.body.Description;
            quiz.Questions = req.body.Questions
            quiz.save().then(quiz => {
                res.json('Quiz is succussffully Updated');
            })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
    });
}

exports.GetOneQuiz = async(req,res) => {
    await Quiz.findOne({_id:req.params.id})
        .then(Quiz=>{
            return res.status(200).json(Quiz);
        }).catch(err=>{
            return res.json(err);
        });
}