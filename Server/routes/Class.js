const express = require("express");
const router = express.Router();
const {
  getClass,
  addClass,
  updateClass,
  deleteClass,
  addUserToClass,
  deleteAllClass,
  removeUserFromClass,
  getClassById,
  getUserByEmail,
  getUserByid,
  ClassByDateYear,
  ClassByLevel,
  
} = require("../Controllers/Class.js");
router.get("/all", getClass);
router.post("/add", addClass);
router.put("/update/:id", updateClass);
router.delete("/delete/:id", deleteClass);
router.delete("/delete/all", deleteAllClass);
router.get("/byyear/:id/:status", ClassByDateYear);
router.get("/bylevel/:id/:status", ClassByLevel);
router.put("addUserToClass/:id/:email", addUserToClass);
router.put("removeUserFromClass/r/:id/:email", removeUserFromClass);
router.get("/useremail/:email", getUserByEmail);
router.get("/:_id", getClassById);
router.get("/userid/:_id", getUserByid);

module.exports = router;
