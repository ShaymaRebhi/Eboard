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
}