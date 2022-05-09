const Class = require("../Model/Class.js");
const Student = require("../Model/Student.js");
const Teacher = require("../Model/Teacher.js");
const User = require("../Model/User.js");
const mongoose = require("mongoose");
const _=require("lodash")

module.exports = {

  UploadFile: async(req,res)=>{
    await Class.findOne({_id:req.params.id},function(err,Class){
        if(err) return res.status(503).json({error:err});
        if (req.file === undefined) return res.status(500).send("you must select a file.");
        const objct={
            file:`https://eboardfrontendapplication.herokuapp.com/file/${req.file.filename}`,
            fileType:req.file.mimetype
        }
        Class=_.extend(Class,objct);
        Class.save((err,Class)=>{
            if(err) return res.status(500).json({error:err})
            if(Class)return res.status(200).json(Class);
        })

    })
},
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
          await Class.findOne({ _id: req.params._id }) .populate('classOwner')
          .populate({
            path: "classUsers",
            populate: "User" ,
          })
           
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
  getUsers: async (req, res) => {
    try {
      res
        .status(200)
        .json(
          await Student.find({}).populate("User")
        );
    } catch (error) {
      res.status(404).json({ statue: false, message: error.message });
    }
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
      const dataFind = await Student.findOne({ _id: req.params.idUser });
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
      const dataFind = await Student.findOne({ _id: req.params.idUser });
      console.log(req.params.idUser);
      const dataUpdate = await Class.update(
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
      const dataFind = await Student.findOne({ email: req.params.email });
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
          $lookup: {
            from: "teachers",
            localField: "classOwner",
            foreignField : "_id",
            as: "classOwner",
          },
        },
        {
          $unwind: "$classOwner" ,
        
        },
        {
          $lookup: {
            from: "users",
            let: {
              id: "$classOwner.User"
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: [
                      "$_id",
                      "$$id"
                    ]
                  }
                }
              },
              
            ],
            as: "classOwner.User"
          }
        },
        {
          $addFields: {
            "classOwner.User": {
              $ifNull: [
                {
                  $arrayElemAt: [
                    "$classOwner.User",
                    0
                  ]
                },
                {}
              ]
            }
          }
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
                file: "$file",
                classStatus: "$classStatus",
                _id: "$_id",
              },
            },
          },
          
        },
       
      ])
      const Final= newLevel.sort(function(a, b){return a._id - b._id})
      res.status(200).json(Final)
        
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
          $lookup: {
            from: "teachers",
            localField: "classOwner",
            foreignField : "_id",
            as: "classOwner",
          },
        },
        {
          $unwind: "$classOwner" ,
        
        },
        {
          $lookup: {
            from: "users",
            let: {
              id: "$classOwner.User"
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: [
                      "$_id",
                      "$$id"
                    ]
                  }
                }
              },
              
            ],
            as: "classOwner.User"
          }
        },
        {
          $addFields: {
            "classOwner.User": {
              $ifNull: [
                {
                  $arrayElemAt: [
                    "$classOwner.User",
                    0
                  ]
                },
                {}
              ]
            }
          }
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
                file: "$file",
                classStatus: "$classStatus",
                _id: "$_id",
              },
            },
          },
        }
      ]) 
         
      const Final= newLevel.sort(function(a, b){return a._id - b._id})
      
      res.status(200).json(Final);
     
    } catch (error) {
      res.status(404).json({ statue: false, message: error.message });
    }
  },
  CountActiveClass: async (req, res) => {
    try {
      const dataFind = await Class.aggregate([
        {
          $match: {
            classStatus: "Active",   $or: [
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
          $count: "active_class",
        },
      ]);
      res.status(201).json(dataFind);
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
  updateClassActive: async (req, res) => {
    try {
      // const updateClass = new ClassModel(req.body);
      const data = await Class.update(
        { _id: req.params.id },
        { classStatus: "Archive" }
      );
      res.status(201).json({
        statue: true,
        message: " Class Archived Succefully",
        result: data,
      });
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
  updateClassArchive: async (req, res) => {
    try {
      // const updateClass = new ClassModel(req.body);
      const data = await Class.update(
        { _id: req.params.id },
        { classStatus: "Active" }
      );
      res.status(201).json({
        statue: true,
        message: " Class Actived Succefully",
        result: data,
      });
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
};
