const express = require("express");
const RateLimit = require("express-rate-limit");
const stringCapitalizeName = require("string-capitalize-name");
var router = express.Router();
const mongoose = require("mongoose");
const Theme = require("../Model/theme.model");


// READ (ALL)
router.get("/", (req, res) => {
  Theme.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, msg: `Something went wrong. ${err}` });
    });
});

// READ (ONE)
router.get("/:id", (req, res) => {
  Theme.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such Theme.` });
    });
});

// READ (ONE BY ID CLASS)
router.get("/findByIdClass/:id", (req, res) => {
  Theme.find({idClass:req.params.id})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such Theme.` });
    });
});

// ADD
router.post("/", (req, res) => {
  
  let newTheme = new Theme({
    
    idClass: req.body.idClass,
    titre: sanitizeTitre(req.body.titre),
    description: sanitizeDescription(req.body.description),
    dateCreation: Date.now(),
  });
  console.log(newTheme);
  newTheme
    .save()
    .then((result) => {
      res.json({
        success: true,
        msg: `Successfully added!`,
        result: {
          _id: result._id,
          idCour: result.idCour,
          idClass: result.idClass,
          titre: result.titre,
          description: result.description,
          dateCreation: result.dateCreation,
        },
      });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.titre) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.titre.message });
          return;
        }
        if (err.errors.description) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.description.message });
          return;
        }
        if (err.errors.dateCreation) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.dateCreation.message });
          return;
        }

        // Show failed if all else fails for some reasons
        res
          .status(500)
          .json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  Theme.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.json({
        success: true,
        msg: `It has been deleted.`,
        result: {
          _id: result._id,
          idCour: result.idCour,
          idClass: result.idClass,
          titre: result.titre,
          description: result.description,
          dateCreation: result.dateCreation,
        },
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: "Nothing to delete." });
    });
});

router.put("/:id", (req, res) => {
  let updatedTheme = {
    idClass: req.body.idClass,
    titre: sanitizeTitre(req.body.titre),
    description: sanitizeDescription(req.body.description),
    dateCreation: Date.now(),
  };

  Theme.findOneAndUpdate({ _id: req.params.id }, updatedTheme, {
    runValidators: true,
    context: "query",
  })
    .then((oldResult) => {
      Theme.findOne({ _id: req.params.id })
        .then((newResult) => {
          res.json({
            success: true,
            msg: `Successfully updated!`,
            result: {
              _id: newResult._id,
              idCour: newResult.idCour,
              idClass: newResult.idClass,
              titre: newResult.titre,
              description: newResult.description,
              dateCreation: newResult.dateCreation,
            },
          });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ success: false, msg: `Something went wrong. ${err}` });
          return;
        });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.titre) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.titre.message });
          return;
        }
        if (err.errors.description) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.description.message });
          return;
        }
        if (err.errors.dateCreation) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.dateCreation.message });
          return;
        }

        // Show failed if all else fails for some reasons
        res
          .status(500)
          .json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

module.exports = router;

// Minor sanitizing to be invoked before reaching the database
sanitizeTitre = (titre) => {
  return stringCapitalizeName(titre);
};
sanitizeDescription = (description) => {
  return description.toLowerCase();
};
