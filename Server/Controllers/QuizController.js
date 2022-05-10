const Quiz = require('../Model/Quiz')
const Evaluation = require('../Model/Evaluation')
const mongoose = require("mongoose");

exports.GetQuiz = async (req,res,next) =>{
    try {
        Quiz.find().then((Quiz)=>res.json(Quiz));

    } catch (error) {
        res.status(404).json({message : error.message});
    }
}
exports.deleteQuiz = async (req,res) =>{
    try {
        Evaluation.deleteMany({Quiz : req.params.id }).exec(function (err, results) {
            console.log("List Evaluations successfully removed.", results);
        });
        Quiz.deleteOne({ _id: req.params.id })
            .then(res.status(200).send(`Quiz is succussffully deleted`))

    }catch (error) {
        res.status(404).json({message : error.message})
    }
}

exports.AddQuiz = async(req,res) => {
    const quizBody = req.body ;
    quizBody.status = "Not Assigned"
    const newQuiz = new Quiz(quizBody)
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

exports.getQuizByTeacher = async (req, res, next) => {
    const idUser = req.params.idUserr;
    const idClass = req.params.idClasse;
    try {
        Quiz.find({
            Creator: idUser,
            Class: idClass
        }).then((quiz) => res.json(quiz));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.assignQuiz= async (req, res) => {
    const idClass = req.params.idClass
    const quiz = req.body;
    quiz.status = "Assigned";
    const newQuiz = new Quiz(quiz);

    try {
        newQuiz.save();
        quiz.listStudents
            .forEach((element) => {
                const newEvaluation = new Evaluation({
                    Quiz: newQuiz._id,
                    Student: element,
                    Class : idClass,
                    Type : "Quiz"
                });
                newEvaluation.save();
            })
            .then((quiz) => res.json(quiz));

        res.status(201).json(newQuiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.assignQuizAfterSave= async (req, res) => {
    const idClass = req.params.idClass
    const quiz = req.body;
    quiz.status = "Assigned";
    const newQuiz = new Quiz(quiz);

    try {
        quiz.listStudents.forEach((element) => {
            const newEvaluation = new Evaluation({
                Quiz: newQuiz._id,
                Student: element,
                Class : idClass,
                Type : "Quiz"
            });
            newEvaluation.save();
        });

        quiz.findByIdAndUpdate(quiz._id, newQuiz, {
            useFindAndModify: false,
        }).then((quiz) =>
            Quiz.findOne({ _id: quiz._id }).then((quiz) => res.json(quiz))
        );
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getQuizByStudentAssigned = async (req, res, next) => {
    const idUser = req.params.idUserr;
    const idClass = req.params.idClass

    try {
        Evaluation.find({
            Student: idUser,
            Class: idClass,
            TaskStatus : "Assigned",
            Type : "Quiz"
        }).populate("Quiz").then((evaluation) => res.json(evaluation));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
exports.getQuizByStudentWorked = async (req, res, next) => {
    const idUser = req.params.idUserr;
    const idClass = req.params.idClass

    try {
        Evaluation.find({
            Student: idUser,
            Class: idClass,
            TaskStatus : "Worked",
            Type : "Quiz"
        }).populate("Student").populate("Quiz").then((evaluation) => res.json(evaluation));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.DisplayQuizByStudent = async (req, res, next) => {
    const idUser = mongoose.Types.ObjectId(req.params.idUserr);
    const idQuiz = mongoose.Types.ObjectId(req.params.idQuiz);
    try {
        Evaluation.findOne({
            Student: idUser,
            Quiz:idQuiz
        }).populate("Quiz").then((evaluation) => res.json(evaluation));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.getNumberEvaluationAssigned = async (req, res, next) => {
    const idUser = req.params.idUserr;
    try {
        Evaluation.find({
            Student: idUser,
            TaskStatus : 'Assigned',
        }).count().then((number) => res.json(number))
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.getNumberEvaluationWorked = async (req, res, next) => {
    const idUser = req.params.idUserr;
    try {
        Evaluation.find({
            Student: idUser,
            TaskStatus : 'Worked',
        }).count().then((number) => res.json(number))
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.getAverageQuizScore = async (req, res, next) => {
    let id = mongoose.Types.ObjectId(req.params.id);
    let averageScore = 0;
    try {
        Evaluation.aggregate(
            [
                {
                    $match : {
                        Quiz:id,
                        TaskStatus : 'Worked',
                        Type : "Quiz"
                    }
                },
                {
                    $group:
                        {
                            _id : "$Quiz",
                            avgScore: { $avg: "$Score" }
                        }
                },

            ]
        ).then((data)=>{
            data.forEach((item,i)=>{
                averageScore = averageScore + item.avgScore
                })
            res.json(averageScore)})
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.updateEvaluationScoreAndStatus = async (req, res, next) => {
    Evaluation.findById(req.params.id,function (err,evaluation){
        if(!evaluation)
            res.status(404).send('data is not found');
        else
            evaluation.Score = req.body.Score;
            evaluation.Comment = req.body.Comment;
            evaluation.TaskStatus = "Worked";
            evaluation.TaskCorrected = "Corrected"

        evaluation.save().then(evaluation=> {
            res.json('evaluation updated');
        })
        .catch(err => {
                res.status(400).send("Update not possible");
        });
    })
}

exports.GetOneQuizEvaluation = async (req, res, next) => {
    await Evaluation.findOne({_id:req.params.id})
        .then(Evaluation=>{
            return res.status(200).json(Evaluation);
        }).catch(err=>{
            return res.json(err);
        });
}

exports.GetNumberStudentByQuizEvaluation = async (req, res, next) => {
    const idQuiz = req.params.id;
    try {
        Evaluation.find({
            Quiz:idQuiz,
            Type : "Quiz"
        }).count().then((number)=>res.json(number))
    }
    catch (error) {
        res.status(404).json({message: error.message});
    }
}
exports.GetNumberStudentWorkedQuiz = async (req, res, next) => {
    const idQuiz = req.params.id;
    try {
        Evaluation.find({
            Quiz:idQuiz,
            TaskStatus : "Worked",
            Type : "Quiz"
        }).count().then((number)=>res.json(number))
    }
    catch (error) {
        res.status(404).json({message: error.message});
    }
}
exports.GetNumberStudentAssignedQuiz = async (req, res, next) => {
    const idQuiz = req.params.id;
    try {
        Evaluation.find({
            Quiz:idQuiz,
            TaskStatus : "Assigned",
            Type : "Quiz"
        }).count().then((number)=>res.json(number))
    }
    catch (error) {
        res.status(404).json({message: error.message});
    }
}
exports.UpdateQuizStatus =async (req, res, next) => {

    Quiz.findById(req.params.id, function (err,quiz){
        if(!quiz)
            res.status(404).send('data is not found');
        else
            quiz.status = "Assigned";
        quiz.save().then(quiz => {
            res.json('Quiz status is succussffully Updated');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
}

exports.getStudentListByQuizWorked = async (req, res, next) => {
    const idQuiz = req.params.idQuiz;
    const idClass = req.params.idClass

    try {
        Evaluation.find({
            Quiz: idQuiz,
            Class: idClass,
            TaskStatus : "Worked",
            Type : "Quiz"
        }).populate("Student").then((evaluation) => res.json(evaluation));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.getMaxQuizScore = async (req, res, next) => {
    let id = mongoose.Types.ObjectId(req.params.id);
    let MaxScore = 0;
    try {
        Evaluation.aggregate(
            [
                {
                    $match : {
                        Quiz:id,
                        TaskStatus : 'Worked',
                        Type : "Quiz"
                    }
                },
                {
                    $group:
                        {
                            _id : "$Quiz",
                            MaxScore: { $max: "$Score" }
                        }
                },

            ]
        ).then((data)=>{
            data.forEach((item,i)=>{
                MaxScore = MaxScore + item.avgScore
            })
            res.json(MaxScore)})
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.getAverageScoreQuizByStudentAndClass = async (req, res, next) => {
    let id = mongoose.Types.ObjectId(req.params.id);
    let idUser = mongoose.Types.ObjectId(req.params.idUser);

    let averageTotal = 0;
    let averageScore = 0;
    try {
        Evaluation.aggregate(
            [
                {
                    $match : {
                        Class:id,
                        Student:idUser,
                        TaskStatus : 'Worked',
                        Type : "Quiz"
                    }
                },
                {
                    $group:
                        {
                            _id : "$Quiz",
                            avgScore: { $avg: "$Score" }
                        }
                },

            ]
        ).then((data)=>{
            data.forEach((item,i)=>{
                averageTotal = averageTotal + item.avgScore
            })
            averageScore = averageTotal / data.length
            res.json(averageScore)})
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.getAverageScoreQuizAndTaskByStudentAndClass = async (req, res, next) => {
    let id = mongoose.Types.ObjectId(req.params.id);
    let idUser = mongoose.Types.ObjectId(req.params.idUser);

    let averageTotal = 0;
    let averageScore = 0;
    try {
        Evaluation.aggregate(
            [
                {
                    $match : {
                        Class:id,
                        Student:idUser,
                        TaskStatus : 'Worked',
                        TaskCorrected:"Corrected"

                    }
                },
                {
                    $group:
                        {
                            _id : "$Quiz",
                            avgScore: { $avg: "$Score" }
                        }
                },

            ]
        ).then((data)=>{
            data.forEach((item,i)=>{
                averageTotal = averageTotal + item.avgScore
            })
            averageScore = averageTotal / data.length
            res.json(averageScore)})
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.getAverageScoreStudent = async (req, res, next) => {
    let idUser = mongoose.Types.ObjectId(req.params.idUser);

    let averageTotal = 0;
    let averageScore = 0;
    try {
        Evaluation.aggregate(
            [
                {
                    $match : {
                        Student:idUser,
                        TaskStatus : 'Worked',
                        TaskCorrected:"Corrected"

                    }
                },
                {
                    $group:
                        {
                            _id : "$Quiz",
                            avgScore: { $avg: "$Score" }
                        }
                },

            ]
        ).then((data)=>{
            data.forEach((item,i)=>{
                averageTotal = averageTotal + item.avgScore
            })
            averageScore = averageTotal / data.length
            res.json(averageScore)})
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}