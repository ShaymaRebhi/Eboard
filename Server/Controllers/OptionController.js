const Option = require('../Model/Option');


exports.GetOption = async (req,res,next) =>{
    try {
        Option.find().then((Option)=>res.json(Option));

    } catch (error) {
        res.status(404).json({message : error.message});
    }
}

exports.deleteOption = async (req,res) =>{
    Option.deleteOne({ _id: req.params.id })
        .then(res.status(200).send(`Option is succussffully deleted`))
        .catch(err => res.status(400).json(err));
}
exports.addOption = async(req,res) => {
    const newOption = new Option(req.body)
    await newOption.save((err, option) => {
        if (err) return res.status(503).json({error: err});
        if (option) return res.status(200).json({
            success: true,
            id: option._id,
            message: 'option Created'
        });
    })
}

exports.updateOption = async(req,res)=>{
    const option =  await Option.findOne({_id:req.body._id});
    const newOption=await Option.findByIdAndUpdate(option._id,req.body).then((Option)=>{
        return res.status(200).send(`Option is succussffully Updated`);
    }).catch(err=>{
        return res.json(err);
    })
}

exports.GetOneOption = async(req,res) => {
    await Option.findOne({_id:req.params.id})
        .then(Option=>{
            return res.status(200).json(Option);
        }).catch(err=>{
            return res.json(err);
        });
}