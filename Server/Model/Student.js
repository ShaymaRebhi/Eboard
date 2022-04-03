var mongoose=require('mongoose')
var Schema =mongoose.Schema;

var Student =new Schema({
    FirstName:{
        type:String
    },
    LastName:{
        type:String
    },
    BirthDate:{
        type:Date,
        default:Date.now
    },
    Cin:{
        type:Number,
        unique:true
    },
    Sexe:{
        type:String,
        enum:["HOMME","FEMME"]
    },
    User:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    }
    

})
module.exports = mongoose.model('Student',Student);