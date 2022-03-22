var mongoose=require('mongoose')
var Schema =mongoose.Schema;

var Task = new Schema ({
    Title:{
        type:String,
        required:true
    },
    Class:{
        type:String,
        required:true
    },
    CreationDate:{
        type:Date,
        default:Date.now,
    },
    questionTitle:{
        type:String,
        required:true
    },
    TypeRec:{
        type:String,
        required:true
    }


})

module.exports = mongoose.model('Task',Task);