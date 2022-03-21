var mongoose=require('mongoose')
var Schema =mongoose.Schema;

var QuestionQuiz = new Schema ({
    questionText:{
        type:String
    },
    Required :{
        type:Boolean
    },
    Score:{
        type:Number
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