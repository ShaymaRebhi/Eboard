const Task = require('../Model/Task');


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

exports.updateTask = async(req,res)=>{
    const task =  await Task.findOne({_id:req.body._id});
    const newtask=await Task.findByIdAndUpdate(task._id,req.body).then((Task)=>{
        return res.status(200).send(`Task is succussffully Updated`);
    }).catch(err=>{
        return res.json(err);
    })
}

exports.GetOneTask = async(req,res) => {
    await Task.findOne({_id:req.params.id})
        .then(Task=>{
            return res.status(200).json(Task);
        }).catch(err=>{
            return res.json(err);
        });
}