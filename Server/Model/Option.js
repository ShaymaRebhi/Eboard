var mongoose=require('mongoose')
var Schema =mongoose.Schema;
var Option = new Schema ({
    OptionText:{
        type:String
    },
    IsValid :{
        type:Boolean
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'QuestionQuiz'
    }

})

module.exports = mongoose.model('Option',Option);