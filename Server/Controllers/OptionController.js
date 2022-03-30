const Option = require('../Model/Option');


exports.GetOption = async (req,res,next) =>{
    try {
        Option.find().then(()=>res.json(Option));

    } catch (error) {
        res.status(404).json({message : error.message});
    }
}

exports.deleteOption = async (req,res) =>{
    Option.deleteOne({ _id: req.params.id })
        .then(deleteConfirmation => res.json(deleteConfirmation))
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