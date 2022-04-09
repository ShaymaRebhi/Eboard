var mongoose=require('mongoose');
var Schema =mongoose.Schema;

var Like =new Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,ref:'users',
    },
    Comment:{
        type:mongoose.Schema.Types.ObjectId,ref:'comment',
    }

});
module.exports = mongoose.model('like',Like);
