var mongoose =require('mongoose');

var Schema =mongoose.Schema;

const bcrypt = require('bcrypt');

var User= new Schema({
    FirstName:{
        type:String,
        required : true
    },
    LastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type : String ,
        required : true
    },
    role:{
        type : String ,
        enum : ['ADMIN','ORGANIZATION','TEACHER','STUDENT'] ,
        required : true
    },
    Sexe:{
        type : String ,
        enum : ['HOMME','FEMME'] ,
        required : true
    },
    Adresse:{
        type : String ,
        required : true
    },
    BirthDate:{
        type : Date,
        default:Date.now 
    },
    Etat:{
        type:Boolean,
        default:false,
        required:true,
    }

},{ timestamps : true })

User.virtual('Password').set(function(Password){
    this.password = bcrypt.hashSync(Password,10)
})

User.methods = {
    authenticate : function(password){
        return bcrypt.compare(password,this.password)
    }
}


module.exports=mongoose.model('user',User);