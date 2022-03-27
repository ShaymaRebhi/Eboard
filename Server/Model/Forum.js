var mongoose=require('mongoose');
var Schema =mongoose.Schema;

var Forum =new Schema({
    Title:{
        type:String,
        required : true
    },
    Description:{
        type:String,
        required:true
    },
    Tags:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now
    },
    User:{
        type:mongoose.Schema.Types.ObjectId,ref:'user',
    },
    Comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}]


});
module.exports = mongoose.model('forum',Forum);
