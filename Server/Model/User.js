var mongoose =require('mongoose');

var Schema =mongoose.Schema;

const bcrypt = require('bcrypt');

var User= new Schema({
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
        enum : ['ADMIN','ORGANIZATION','TEACHER','STUDENT'],
        required:true 
    },
    file:{
        type:String,
        default:"https://t4.ftcdn.net/jpg/00/32/90/45/360_F_32904522_rB7stqckrXluy8QKMQj4veFHNjeIJ3c1.jpg"
    },

    fileType:{
        type:String
    },
    Adresse:{
        type : String
       
       
    },
    Phone:{
        type:Number
        
    },
    Etat:{
        type:Boolean,
        default:false
       
    },
    resetLink:{
        data:String,
        default:''
    },
    emailVerification:{
        type:Boolean,
        default:false
    },
    activateLink:{
        data:String,
        default:''
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


module.exports=mongoose.model('users',User);