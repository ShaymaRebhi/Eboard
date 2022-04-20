var mongoose=require('mongoose')
var Schema =mongoose.Schema;

var Evaluation = new Schema ({

    TaskStatus : {
        type : String,
        default : 'Assigned'
    },
    Type :{
        type : String
    },
    Quiz :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Quiz'
    },
    Task :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Task'
    },
    Score :{
        type:Number,
    },
    Comment :{
        type:String
    },
    TaskResponseFile :{
        type:[]
    },
    TaskCorrected :{
        type:String,
    },
    Class :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Class'
    },
    Student :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Student'
    }

})

module.exports = mongoose.model('Evaluation',Evaluation);