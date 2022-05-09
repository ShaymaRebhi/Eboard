const Token = require("../Model/Token");
exports.add = async (req, res) => {
  var token = new Token({
    token: req.body.token,
  });
  Token.find({ token: req.body.token }).then((value) => {
    console.log(value);
    if (value.length == 0) token.save();
  });
  res.send(token);
};

exports.getAll = async (req, res) => {
  await Token.find({})
    .then((Token) => {
      return res.status(200).json(Token);
    })
    .catch((err) => {
      return res.json(err);
    });
};

exports.deleteAll = async (req, res) => {
  await Token.deleteMany({});
  res.send(true);
};
