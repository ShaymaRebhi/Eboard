var mongoose=require('mongoose')
var Schema =mongoose.Schema;

var Quiz = new Schema ({
    Title:{
        type:String
    },
    Class:{
        type:String
    },
    Description:{
        type:String
    },
    Questions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionQuiz'
    }]

})

module.exports = mongoose.model('Quiz',Quiz);