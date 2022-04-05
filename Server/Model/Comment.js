var mongoose=require('mongoose');
var Schema =mongoose.Schema;

var Comment =new Schema({
    Comment:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now
    },
    Forum:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'forum',
    },
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    }


})
module.exports = mongoose.model('comment',Comment);
