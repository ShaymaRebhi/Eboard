var mongoose=require('mongoose')
var Schema =mongoose.Schema;

var Quiz = new Schema ({
    Title:{
        type:String,
        required:true
    },
    Theme:{
        type:String,
    /*    required:true*/
    },
    Description:{
        type:String,
        required:true
    },
    Questions:{
        type:[],
    },
    status : {
        type: String,
        required : true
    },
    CreationDate:{
        type:Date,
        default:Date.now,
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

module.exports = mongoose.model('Quiz',Quiz);