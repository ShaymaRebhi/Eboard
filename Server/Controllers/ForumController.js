var FCM = require("fcm-node");
const Forum = require("../Model/Forum");
const Token = require("../Model/Token");
const { loginValidation } = require("../Validation/Validation.js");
var serverKey =
  "AAAAn0EQRdg:APA91bGtZc-D3WnuEKweV2gIPDz7_pET4VohA4hxaFr_GeWhicj73NfL7E_CU87_FsovSE3swZ_iNe8O8fLemC1tZA01xN1P5CsJ06nmGD2mim739t6L4CHTLvdk1RqrKmE_wfQDBi6J"; //put your server key here
var fcm = new FCM(serverKey);

exports.add = async (req, res) => {
  var forum = new Forum({
    Title: req.body.Title,
    Description: req.body.Description,
    Tags: req.body.Tags,
    User: req.body.User,
  });
  try {
    var Tokens = [];
    Token.find().then((value) => {
      value.map((value) => Tokens.push(value.token));
      console.log(Tokens);
      var message = {
        //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        registration_ids: Tokens,
        notification: {
          title: "A new post has been added",
          body: "A new post has been added",
        },
      };

      fcm.send(message, function (err, response) {
        if (err) {
          console.log("Something has gone wrong!");
        } else {
          console.log("Successfully sent with response: ", response);
        }
      });
      console.log(req.body);
      forum.save();
      res.send(forum);
    });
  } catch (err) {
    res.send(err);
  }
};

exports.getAll = async (req, res) => {
  await Forum.find({})
    .then((Forum) => {
      return res.status(200).json(Forum);
    })
    .catch((err) => {
      return res.json(err);
    });
};

exports.search = async (req, res) => {
  await Forum.find({
    $or: [
      { Title: { $regex: ".*" + req.body.search + ".*" } },
      { Description: { $regex: ".*" + req.body.search + ".*" } },
      { Tags: { $regex: ".*" + req.body.search + ".*" } },
    ],
  })
    .then((Forum) => {
      return res.status(200).json(Forum);
    })
    .catch((err) => {
      return res.json(err);
    });
};

exports.findById = async (req, res) => {
  await Forum.findOne({ _id: req.params.id })
    .then((Forum) => {
      return res.status(200).json(Forum);
    })
    .catch((err) => {
      return res.json(err);
    });
};

exports.update = async (req, res) => {
  const forum = await Forum.findOne({ _id: req.body._id });
  await Forum.findByIdAndUpdate(forum._id, req.body);
  await Forum.findOne({ _id: forum._id })
    .then((f) => {
      return res.status(200).json(f);
    })
    .catch((err) => {
      return res.json(err);
    });
};

exports.delete = async (req, res) => {
  await Forum.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json("forum deleted");
      console.log("forum deleted");
    })
    .catch(function (error) {
      console.log(error);
    });
};
