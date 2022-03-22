var mongoose=require('mongoose')
var Schema =mongoose.Schema;
var Option = new Schema ({
    OptionText:{
        type:String,
        required:true,
        default:"option"
    },
    IsValid :{
        type:Boolean,
        required:true,
        default:false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'QuestionQuiz'
    }

})

module.exports = mongoose.model('Option',Option);