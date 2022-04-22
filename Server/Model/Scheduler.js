const mongoose = require('mongoose');
const StudentSchema = new mongoose.Schema({
    text : {
        type : String,
    },
    startDate : {
        type : Date,
    },
    endDate : {
        type : Date,
    },
    description : {
        type : String,
    },
    sectionId : {
        type : [Number]
    },
    allDay : {
        type : Boolean,
    },
    postOwner :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
})
module.exports = mongoose.model('Scheduler', StudentSchema);