var mongoose=require('mongoose')
var Schema =mongoose.Schema;

var Student =new Schema({
    FirstName:{
        type:String,
        required : true
    },
    LastName:{
        type:String,
        required:true
    },
    BirthDate:{
        type:Date,
        required:true,
        default:Date.now
    },
    Cin:{
        type:Number,
        required:true
    },
    Sexe:{
        type:String,
        enum:["HOMME","FEMME"],
        required:true
    },
    User:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    }
    

})
module.exports = mongoose.model('Student',Student);