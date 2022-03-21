const Quiz = require('../Model/Quiz')
const Option = require('../Model/Option')
const Question = require('../Model/QuestionQuiz')


exports.AddQuiz = async(req,res)=>{
    const _Quiz = new Quiz(req.body);
    const _Option = new Option(req.body);
    const _Question = new Question(req.body);
    _Option.save((err,option)=> {
        if (err) return res.status(503).json({error: err});
        req.body.option= option;
            _Question.save((err, question) => {
                if (err) return res.status(503).json({error: err});
                req.body.Question = question;
                _Quiz.save((err, quiz) => {
                        if (err) return res.status(503).json({error: err});
                        if (quiz) return res.status(200).json(quiz);
                    })
             })
    })
}
