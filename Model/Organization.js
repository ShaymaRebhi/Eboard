var mongoose=require('mongoose')
var Schema =mongoose.Schema;


var Organiation =new Schema({
    Name:{
        type:String,
        required:true
    },
    Payement:{
        type:Boolean,
        default:false
    },
    User:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    }
})

module.exports = mongoose.model('organization',Organiation);