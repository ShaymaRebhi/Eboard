var mongoose=require('mongoose')
var Schema =mongoose.Schema;

var Evaluation = new Schema ({

    TaskStatus : {
        type : String,
        default : 'Assigned'
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
        default : 0
    },
    Comment :{
        type:String
    },
    Class :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Class'
    },
    Student :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'users'
    }

})

module.exports = mongoose.model('Evaluation',Evaluation);