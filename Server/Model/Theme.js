const mongoose = require("mongoose");

var ThemeSchema = new mongoose.Schema({
  idClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
  titre: {
    type: String,
  },
  description: {
    type: String,
  },
  dateCreation: {
    type: Date,
    min: "1987-09-28",
  },
});

mongoose.model("Theme", ThemeSchema);
