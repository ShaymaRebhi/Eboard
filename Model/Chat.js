var mongoose=require('mongoose')
var Schema =mongoose.Schema;

var Chat =new Schema(
    {
        message: {
          text: { type: String, required: true },
        },
        users: Array,
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
      },
      {
        timestamps: true,
      }
    );
    

module.exports = mongoose.model('chats',Chat);