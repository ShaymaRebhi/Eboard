var express = require("express");
var router = express.Router();
const firebaseController = require("../controllers/FirebaseController");

router.post("/add", firebaseController.add);
router.get("/getall", firebaseController.getAll);
router.post("/deleteAll", firebaseController.deleteAll);
module.exports = router;
