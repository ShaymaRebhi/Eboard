const Task = require('../Model/Task');


exports.GetTask = async (req,res,next) =>{
    try {
        Task.find().then(()=>res.json(Task));

    } catch (error) {
        res.status(404).json({message : error.message});
    }
}

exports.deleteTask = async (req,res) =>{
    Task.deleteOne({ _id: req.params.id })
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.status(400).json(err));
}
exports.addTask = async(req,res) => {
    const newTask = new Task(req.body)
    await newTask.save((err, task) => {
        if (err) return res.status(503).json({error: err});
        if (task) return res.status(200).json({
            success: true,
            id: task._id,
            message: 'Task Created'
        });
    })
}