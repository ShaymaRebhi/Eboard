var mongoose=require('mongoose')
var Schema =mongoose.Schema;

var Task = new Schema ({
    Title:{
        type:String,
        required:true
    },
    Theme:{
        type:String,
        //required:true
    },
    CreationDate:{
        type:Date,
        default:Date.now,
    },
    Description:{
        type:String,
        required:true
    },
    QuestionFile:{
        type:String,
        //required:true
    },
    status : {
        type: String,
        required : true
    },
    listStudents : {
        type : [Object],

    },
    Class :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Class'
    },
    Creator :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'users'

    }




})

module.exports = mongoose.model('Task',Task);