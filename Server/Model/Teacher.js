const { boolean } = require('@hapi/joi');
var mongoose=require('mongoose')
var Schema =mongoose.Schema;

var Teacher =new Schema({
    FirstName:{
        type:String,
        default:"Teacher"
        
    },
    LastName:{
        type:String,
        default:"Teacher"
        
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
        ref:'users'
    }

})
module.exports = mongoose.model('Teacher',Teacher);