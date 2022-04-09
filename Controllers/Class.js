const Class = require("../Model/Class.js");
const mongoose = require("mongoose");

module.exports = {
  getClass: async (req, res) => {
    try {
      res
        .status(200)
        .json(
          await Class.find({})
          .populate('classOwner')
          .populate("classUsers")
           
        );
    } catch (error) {
      res.status(404).json({ statue: false, message: error.message });
     
    }
  },
  getClassById: async (req, res) => {
    try {
      res
        .status(200)
        .json(
          await Class.findOne({ _id: req.params._id })
           
        );
    } catch (error) {
      res.status(404).json({ statue: false, message: error.message });
    }
  },
  addClass: async (req, res) => {
    const newClass = new Class(req.body);
    await newClass.save((err, Class) => {
      if (err) return res.status(503).json({error: err});
      if (Class) return res.status(200).json({
        
          success: true,
          id: Class._id,
          message: 'Class Created'
      });
         req.body.User=User._id;
  })
  },
  updateClass: async (req, res) => {
    try {
      const data = await Class.findByIdAndUpdate(
        mongoose.Types.ObjectId(req.params.id),
        req.body
      );
      res.status(201).json({
        statue: true,
        message: " Class Updated Succefully",
        result: data,
      });
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },

  deleteClass: async (req, res) => {
    try {
      const data = await Class.findByIdAndRemove(req.params.id);
      res.status(201).json({
        statue: true,
        message: "Class Deleted Succefully",
        result: data,
      });
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
  deleteAllClass: async (req, res) => {
    try {
      const data = await ClassModel.remove({});
      res.status(201).json({
        statue: true,
        message: "Class Deleted Succefully",
        result: data,
      });
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
  addUserToClass: async (req, res) => {
    try {
      const dataFind = await Student.findOne({ email: req.params.email });
      const dataUpdate = await Class.updateOne(
        { _id: req.params.id },
        { $push: { classUsers: [dataFind] } }
      );
      res.status(201).json({
        statue: true,
        message: "Class Updated Succefully",
        result: dataUpdate,
      });
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
  removeUserFromClass: async (req, res) => {
    try {
      const dataFind = await StudentModel.findOne({ email: req.params.email });
      console.log(req.params.email);
      const dataUpdate = await ClassModel.update(
        { _id: req.params.id },
        { $pullAll: { classUsers: [dataFind] } },
        { safe: true }
      );
      res.status(201).json({
        statue: true,
        message: "Class Updated Succefully User Removed",
        result: dataUpdate,
      });
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
  getUserByEmail: async (req, res) => {
    try {
      const dataFind = await StudentModel.findOne({ email: req.params.email });
      res.status(201).json(dataFind);
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
  getUserByid: async (req, res) => {
    try {
      const dataFind = await Student.findOne({ _id: req.params._id });
      res.status(201).json(dataFind);
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },

  ClassByDateYear: async (req, res) => {
    try {
      const newLevel =await Class.aggregate([
        {
          $match: {
            classStatus: req.params.status,
            $or: [
              {
                classUsers: {
                  $in: [mongoose.Types.ObjectId(req.params.id)],
                },
              },
              {
                classOwner: {
                  $in: [mongoose.Types.ObjectId(req.params.id)],
                },
              },
            ],
          },
        },
        {
          $unwind: "$className",
        },
        {
          $group: {
            _id: { $year: "$classDatePost" },
            classObjet: {
              $push: {
                className: "$className",
                classSection: "$classSection",
                classDatePost: "$classDatePost",
                classOwner: "$classOwner",
                classUsers: "$classUsers",
                classLevel: "$classLevel",
                classColor: "$classColor",
                classStatus: "$classStatus",
                _id: "$_id",
              },
            },
          },
        },
      ])
      const Final= newLevel.sort(function(a, b){return a._id - b._id});
      res.status(200).json(Final);
    } catch (error) {
      res.status(404).json({ statue: false, message: error.message });
    }
  },
  ClassByLevel: async (req, res) => {
    try {
      let newLevel = await Class.aggregate([
        {
          $match: {
            classStatus: req.params.status,
            $or: [
              {
                classUsers: {
                  $in: [mongoose.Types.ObjectId(req.params.id)],
                },
              },
              {
                classOwner: {
                  $in: [mongoose.Types.ObjectId(req.params.id)],
                },
              },
            ],
          },
        },
        {
          $unwind: "$classLevel",
        },
        {
          $group: {
            _id: "$classLevel",
            classObjet: {
              $push: {
                className: "$className",
                classSection: "$classSection",
                classDatePost: "$classDatePost",
                classOwner: "$classOwner",
                classUsers: "$classUsers",
                classLevel: "$classLevel",
                classColor: "$classColor",
                classStatus: "$classStatus",
                _id: "$_id",
              },
            },
          },
        },
      ]);
      const Final= newLevel.sort(function(a, b){return a._id - b._id});
      res.status(200).json(Final);
    } catch (error) {
      res.status(404).json({ statue: false, message: error.message });
    }
  },
  
};
