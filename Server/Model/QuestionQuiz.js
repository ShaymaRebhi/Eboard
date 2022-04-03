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
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Quiz'
    }
    ,
    Options:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Option'
    }
    ]


})

module.exports = mongoose.model('QuestionQuiz',QuestionQuiz);