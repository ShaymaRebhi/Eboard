var mongoose=require('mongoose')
var Schema =mongoose.Schema;

const Reclamation=new Schema({
    
    type:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        default:1
    },
    User:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
},{ timestamps : true });



module.exports = mongoose.model('reclamations',Reclamation);