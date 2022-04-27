var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Token = new Schema({
  token: {
    type: String,
  },
});
module.exports = mongoose.model("Token", Token);
