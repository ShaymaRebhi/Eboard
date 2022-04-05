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
    User:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
},{ timestamps : true });



module.exports = mongoose.model('reclamations',Reclamation);