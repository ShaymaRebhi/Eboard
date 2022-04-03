var mongoose=require('mongoose')
var Schema =mongoose.Schema;

var Quiz = new Schema ({
    Title:{
        type:String,
        required:true
    },
    Class:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Questions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionQuiz'
    }]

})

module.exports = mongoose.model('Quiz',Quiz);