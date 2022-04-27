const express = require("express");
const router = express.Router();
const upload =require('../MiddelWare/Upload')
require('dotenv').config()  
var multer  = require('multer')
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
  UploadFile,
  CountActiveClass,
  updateClassActive,
  updateClassArchive,
  getUsers,
  
} = require("../Controllers/Class.js");
router.get("/all", getClass);
router.get("/usersall/", getUsers);
router.post("/add", addClass);
router.put("/update/:id", updateClass);
router.delete("/delete/:id", deleteClass);
router.delete("/delete/all", deleteAllClass);
router.get("/byyear/:id/:status", ClassByDateYear);
router.get("/bylevel/:id/:status", ClassByLevel);
router.put("/addUserToClass/:id/:idUser", addUserToClass);
router.put("/removeUserFromClass/:id/:idUser", removeUserFromClass);
router.get("/useremail/:email", getUserByEmail);
router.get("/:_id", getClassById);
router.get("/userid/:_id", getUserByid);
router.put('/upload/:id',upload.single('file'),UploadFile);
router.put("/update/archive/:id", updateClassActive);
router.put("/update/active/:id", updateClassArchive);
router.get("/countactive/:id", CountActiveClass);

module.exports = router;
