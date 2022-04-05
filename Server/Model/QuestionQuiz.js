var mongoose=require('mongoose')
var Schema =mongoose.Schema;

var QuestionQuiz = new Schema ({
    questionText:{
        type:String,
        required:true,
    },
    Required :{
        type:Boolean,
        required:true,
        default:true
    },
    Score:{
        type:Number,
        required:true
    },
    Quiz:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Quiz'
    }
    ,
    Options: {
        type:[],
    }


})

module.exports = mongoose.model('QuestionQuiz',QuestionQuiz);