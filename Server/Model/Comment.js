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
        ref:'users',
    },
    likes:{
        type:Number,
        default:0
    },
    Likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'like'}]


});
module.exports = mongoose.model('comment',Comment);
