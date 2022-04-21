const Task = require('../Model/Task');
const Evaluation = require("../Model/Evaluation");
const mongoose = require("mongoose");


exports.GetTask = async (req,res,next) =>{
    try {
        Task.find().then((Task)=>res.json(Task));

    } catch (error) {
        res.status(404).json({message : error.message});
    }
}

exports.deleteTask = async (req,res) =>{
    Task.deleteOne({ _id: req.params.id })
        .then(res.status(200).send(`Task is succussffully deleted`))
        .catch(err => res.status(400).json(err));
}
exports.addTask = async(req,res) => {
    const taskBody = req.body ;
    taskBody.status = "Not Assigned"
    const newTask = new Task(taskBody)
    await newTask.save((err, task) => {
        if (err) return res.status(503).json({error: err});
        if (task) return res.status(200).json({
            success: true,
            id: task._id,
            message: 'Task Created'
        });
        req.body.User=User._id;
    })
}

exports.updateTask = async(req,res)=> {
    Task.findById(req.params.id, function (err,task){
        if(!task)
            res.status(404).send('data is not found');
        else
            task.Title = req.body.Title;
            task.Theme = req.body.Theme;
            task.Description = req.body.Description;
            task.QuestionFile = req.body.QuestionFile

            task.save().then(task => {
                res.json('task updated');
            })
            .catch(err => {
                    res.status(400).send("Update not possible");
            });
    });
}

exports.GetOneTask = async(req,res) => {
    await Task.findOne({_id:req.params.id})
        .then(Task=>{
            return res.status(200).json(Task);
        }).catch(err=>{
            return res.json(err);
        });
}

exports.getTaskByTeacher = async (req, res, next) => {
    const idUser = req.params.idUserr;
    const idClass = req.params.idClasse;
    try {
        Task.find({
            Creator: idUser,
            Class: idClass
        }).then((task) => res.json(task));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.assignTask= async (req, res) => {
    const idClass = req.params.idClass
    const task = req.body;
    task.status = "Assigned";
    const newTask = new Task(task);

    try {
        newTask.save();
        task.listStudents
            .forEach((element) => {
                const newEvaluation = new Evaluation({
                    Task: newTask._id,
                    Student: element,
                    Class : idClass,
                    Type : "Task"
                });
                newEvaluation.save();
            })
            .then((task) => res.json(task));

        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.assignTaskAfterSave= async (req, res) => {
    const idClass = req.params.idClass
    const task = req.body;
    task.status = "Assigned";
    const newTask = new Task(task);

    try {
        task.listStudents.forEach((element) => {
            const newEvaluation = new Evaluation({
                Task: newTask._id,
                Student: element,
                Class : idClass,
                Type : "Task"
            });
            newEvaluation.save();
        });

        task.findByIdAndUpdate(task._id, newTask, {
            useFindAndModify: false,
        }).then((task) =>
            Task.findOne({ _id: task._id }).then((task) => res.json(task))
        );
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.UpdateTaskStatus =async (req, res, next) => {

    Task.findById(req.params.id, function (err,task){
        if(!task)
            res.status(404).send('data is not found');
        else
            task.status = "Assigned";
        task.save().then(task => {
            res.json('Task status is succussffully Updated');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
}

exports.getTaskByStudentAssigned = async (req, res, next) => {
    const idUser = req.params.idUserr;
    const idClass = req.params.idClass

    try {
        Evaluation.find({
            Student: idUser,
            Class: idClass,
            TaskStatus : "Assigned",
            Type : "Task"
        }).populate("Task").then((evaluation) => res.json(evaluation));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
exports.getTaskByStudentWorked = async (req, res, next) => {
    const idUser = req.params.idUserr;
    const idClass = req.params.idClass

    try {
        Evaluation.find({
            Student: idUser,
            Class: idClass,
            TaskStatus : "Worked",
            Type : "Task"
        }).populate("Task").then((evaluation) => res.json(evaluation));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

exports.DisplayTaskByStudent = async (req, res, next) => {
    const idUser = mongoose.Types.ObjectId(req.params.idUserr);
    const idTask = mongoose.Types.ObjectId(req.params.idTask);
    try {
        Evaluation.findOne({
            Student: idUser,
            Task:idTask
        }).populate("Task").then((evaluation) => res.json(evaluation));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


exports.GetOneTaskEvaluation = async (req, res, next) => {
    await Evaluation.findOne({_id:req.params.id})
        .then(Evaluation=>{
            return res.status(200).json(Evaluation);
        }).catch(err=>{
            return res.json(err);
        });
}

exports.GetNumberStudentByTaskEvaluation = async (req, res, next) => {
    const idTask = req.params.id;
    try {
        Evaluation.find({
            Task : idTask,
            Type : "Task"
        }).count().then((number)=>res.json(number))
    }
    catch (error) {
        res.status(404).json({message: error.message});
    }
}
exports.GetNumberStudentWorkedTask = async (req, res, next) => {
    const idTask = req.params.id;
    try {
        Evaluation.find({
            Task : idTask,
            TaskStatus : "Worked",
            Type : "Task"
        }).count().then((number)=>res.json(number))
    }
    catch (error) {
        res.status(404).json({message: error.message});
    }
}
exports.GetNumberStudentAssignedTask = async (req, res, next) => {
    const idTask = req.params.id;
    try {
        Evaluation.find({
            Task:idTask,
            TaskStatus : "Assigned",
            Type : "Task"
        }).count().then((number)=>res.json(number))
    }
    catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.getNumberTaskAssigned = async (req, res, next) => {
    const idUser = req.params.idUserr;
    try {
        Evaluation.find({
            Student: idUser,
            TaskStatus : 'Assigned',
            Type : "Task"
        }).count().then((number) => res.json(number))
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.getNumberTaskWorked = async (req, res, next) => {
    const idUser = req.params.idUserr;
    try {
        Evaluation.find({
            Student: idUser,
            TaskStatus : 'Worked',
            Type : "Task"
        }).count().then((number) => res.json(number))
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.getAverageTaskScore = async (req, res, next) => {
    let id = mongoose.Types.ObjectId(req.params.id);
    let averageScore = 0;
    try {
        Evaluation.aggregate(
            [
                {
                    $match : {
                        Task:id,
                        TaskStatus : 'Worked',
                        Type : "Task"
                    }
                },
                {
                    $group:
                        {
                            _id : "$Task",
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

exports.updateTaskEvaluationStatus = async (req, res, next) => {
    Evaluation.findById(req.params.id,function (err,evaluation){
        if(!evaluation)
            res.status(404).send('data is not found');
        else
            evaluation.TaskStatus = "Worked";
            evaluation.TaskCorrected = "Not Corrected"
            evaluation.Score = 0;

        evaluation.save().then(evaluation=> {
            res.json('evaluation updated');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    })
}

exports.updateTaskEvaluationScore = async (req, res, next) => {
    Evaluation.findById(req.params.id,function (err,evaluation){
        if(!evaluation)
            res.status(404).send('data is not found');
        else
            evaluation.Score = req.body.Score;
            evaluation.Comment = req.body.Comment;
            evaluation.TaskCorrected = "Corrected"

        evaluation.save().then(evaluation=> {
            res.json('evaluation updated');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    })
}

exports.getAverageScoreTaskByStudentAndClass = async (req, res, next) =>  {
    let id = mongoose.Types.ObjectId(req.params.id);
    let idUser = mongoose.Types.ObjectId(req.params.idUser);

    let averageScore = 0;
    let averageTotal = 0;
    try {
        Evaluation.aggregate(
            [
                {
                    $match : {
                        Class:id,
                        Student:idUser,
                        TaskStatus : 'Worked',
                        Type : "Task",
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

