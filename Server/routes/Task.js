var express = require('express');
var router = express.Router()
require('dotenv').config()
const TaskController = require('../Controllers/TaskController')
const multer = require("multer");
const RateLimit = require("express-rate-limit");
const { Storage } = require("@google-cloud/storage");
const Task = require('../Model/Task');
const Evaluation = require("../Model/Evaluation");


const perf = require("execution-time")();
router = express.Router();

const storages = new Storage({
    projectId: "e-board-146ea",
    keyFilename: "./e-board-146ea-firebase-adminsdk-sm0e1-1aa4cca450.json",
});

const bucket = storages.bucket("gs://e-board-146ea.appspot.com");

const uploader = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 300 * 1024 * 1024,
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(" ").join("-");
        cb(null, Date.now() + "-" + fileName);
    },
});
function UploadingArray(files) {
    const reqFiles = [];
    let wakt;
    try {
        for (let i = 0; i < files.length; i++) {
            if (!files[i]) {
                return;
            }

            const blob = bucket.file(files[i].originalname);

            const blobWriter = blob.createWriteStream({
                metadata: {
                    contentType: files[i].mimetype,
                },
            });

            blobWriter.on("error", (err) => next(err));
            {
                perf.start();
                blobWriter.on("finish", async () => {

                    await reqFiles.push({
                        type: files[i].mimetype,
                        originalname: files[i].originalname,

                        url: `https://firebasestorage.googleapis.com/v0/b/${
                            bucket.name
                        }/o/${encodeURI(blob.name)}?alt=media`,
                    });


                    const results = perf.stop();
                    console.log(results.time);
                });
            }

            blobWriter.end(files[i].buffer);
        }
    } catch (error) {
        return;
    }
    console.log("time !!!!!!!!!!");
    console.log(wakt);
    const test = {
        reqFiles: reqFiles,
        timer: wakt,
    };
    return test;
}

router.post(
    "/api/upload",
    uploader.array("TaskResponseFile", 6),
    async (req, res, next) => {
        const reqFiles = [];
        try {
            perf.start();
            for (let i = 0; i < req.files.length; i++) {
                if (!req.files[i]) {
                    return;
                }

                const blob = bucket.file(Date.now() + "-" + req.files[i].originalname);

                const blobWriter = blob.createWriteStream({
                    metadata: {
                        contentType: req.files[i].mimetype,
                    },
                });

                blobWriter.on("error", (err) => next(err));
                {
                    blobWriter.on("finish", async () => {

                        await reqFiles.push({
                            type: req.files[i].mimetype,
                            originalname: req.files[i].originalname,

                            url: `https://firebasestorage.googleapis.com/v0/b/${
                                bucket.name
                            }/o/${encodeURI(blob.name)}?alt=media`,
                        });


                        if (i + 1 === req.files.length) {
                            const results = perf.stop();
                            console.log(results.time);
                            setTimeout(() => {
                                res.status(200).send({
                                    result: {
                                        reqFiles,
                                    },
                                });
                            }, results.time);
                        }

                    });
                }

                blobWriter.end(req.files[i].buffer);
            }
        } catch (error) {
            return;
        }
    }
);
const DIR = "./uploads/file";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(" ").join("-");
        cb(null, Date.now() + "-" + fileName);
    },
});

const minutes = 5;


var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "video/ogg" ||
            file.mimetype == "video/mp4" ||
            file.mimetype == "video/mp4" ||
            file.mimetype == "video/x-matroska" ||
            file.mimetype == "audio/wav" ||
            file.mimetype == "image/png" ||
            file.mimetype == "image/png" ||
            file.mimetype == "image/png" ||
            file.mimetype == "image/png" ||
            file.mimetype == "image/png" ||
            file.mimetype == "image/png" ||
            file.mimetype == "image/png" ||
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "audio/mpeg" ||
            file.mimetype == "application/pdf" ||
            file.mimetype == "application/doc" ||
            file.mimetype == "application/msword" ||
            file.mimetype == "application/javascript" ||
            file.mimetype == "application/json" ||
            file.mimetype == "application/vnd.ms-powerpoint" ||
            file.mimetype ==
            "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
            file.mimetype ==
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
            file.mimetype == "application/x-rar-compressed" ||
            file.mimetype == "application/xlsx" ||
            file.mimetype == "application/xls"
        ) {
        }
        cb(null, true);
    },
});

router.post(
    "/upload",
    upload.array("QuestionFile", 6),
    (req, res, next) => {
        const reqFiles = [];
        const url = req.protocol + "://" + req.get("host");
        if (req.files) {
            for (var i = 0; i < req.files.length; i++) {
                reqFiles.push(
                    "http://localhost:3000/uploads/file/" + req.files[i].filename
                );
            }
        }

        res.status(201).json({
            msg: "Done upload!",
            success: true,
            result: {
                reqFiles,
            },
        });
    }
);

router.post(
    "/add",
    uploader.array("QuestionFile", 6),
    async (req, res, next) => {
        console.log(req.files);
        const reqFiles = [];
        try {
            for (let i = 0; i < req.files.length; i++) {
                if (!req.files[i]) {
                    return;
                }

                const blob = bucket.file(Date.now() + "-" + req.files[i].originalname);

                const blobWriter = await blob.createWriteStream({
                    metadata: {
                        contentType: req.files[i].mimetype,
                    },
                });

                blobWriter.on("error", (err) => next(err));
                perf.start();
                blobWriter.on("finish", async () => {
                    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
                        bucket.name
                    }/o/${encodeURI(blob.name)}?alt=media`;


                    await reqFiles.push({
                        type: req.files[i].mimetype,
                        originalname: req.files[i].originalname,

                        url: publicUrl,
                    });
                    const results = perf.stop();
                    console.log(results.time);
                    if (i + 1 === req.files.length) {
                        setTimeout(() => {
                            console.log("this is resources");
                            console.log(i + 1);
                            console.log(req.files.length);
                            console.log(reqFiles);
                            const taskBody = req.body;
                            taskBody.status = "Not Assigned"
                            taskBody.QuestionFile = reqFiles;
                            const task = new Task(taskBody);
                            task
                                .save()
                                .then((result) => {
                                    res.status(201).json({
                                        msg: "Successfully Added",
                                        success: true,
                                    });
                                })
                                .catch((err) => {
                                    console.log(err),
                                        res.status(500).json({
                                            success: false,
                                            error: err,
                                        });
                                });
                        }, results.time);
                    }
                });
                blobWriter.end(req.files[i].buffer);
            }
        } catch (error) {

            return;
        }
        console.log("this is idClass");
    }
);

router.put("/updateEvaluationStatus/:id", (req, res) => {
    let updatedEvaluation = {
        TaskStatus : "Worked",
        TaskCorrected : "Not Corrected",
        TaskResponseFile : req.body.TaskResponseFile
    };

    console.log(updatedEvaluation);

    Evaluation.findOneAndUpdate({ _id: req.params.id }, updatedEvaluation, {
        runValidators: true,
        context: "query",
    })

        .then((oldResult) => {
            console.log("true");
            Evaluation.findOne({ _id: req.params.id })
                .then((result) => {
                    console.log("this is result " + result);
                    res.json({
                        success: true,
                        msg: `Successfully updated!`
                    });
                })

                .catch((err) => {
                    console.log("false1");
                    res
                        .status(501)
                        .json({ success: false, msg: `Something went wrong. ${err}` });
                    return;
                });
        })
        .catch((err) => {
            console.log(err);
            if (err.errors) {
                if (err.errors.TaskStatus) {
                    res
                        .status(400)
                        .json({ success: false, msg: err.errors.TaskStatus.message });
                    return;
                }
                if (err.errors.TaskCorrected) {
                    res
                        .status(400)
                        .json({ success: false, msg: err.errors.TaskCorrected.message });
                    return;
                }
                if (err.errors.TaskResponseFile) {
                    res
                        .status(400)
                        .json({ success: false, msg: err.errors.TaskResponseFile.message });
                    return;
                }

                // Show failed if all else fails for some reasons
                res
                    .status(500)
                    .json({ success: false, msg: `Something went wrong. ${err}` });
                        console.log("ereuuuurrrrrr")
            }
        });
});

router.get('/',TaskController.GetTask);
router.get('/:id',TaskController.GetOneTask);
router.delete('/:id',TaskController.deleteTask);
router.post('/update/:id',TaskController.updateTask);
router.get('/getTaskByTeacher/:idUserr/:idClasse',TaskController.getTaskByTeacher);
router.post('/assign/:idClass',TaskController.assignTask);
router.post('/assignTaskAfterSave/:idClass',TaskController.assignTaskAfterSave);
router.get('/getTaskByStudentAssigned/:idClass/:idUserr',TaskController.getTaskByStudentAssigned);
router.get('/getTaskByStudentWorked/:idClass/:idUserr',TaskController.getTaskByStudentWorked);
router.get('/displayTask/:idUserr/:idTask',TaskController.DisplayTaskByStudent);
router.post('/updateEvaluationScore/:id',TaskController.updateTaskEvaluationScore);
router.post('/updateStatus/:id',TaskController.UpdateTaskStatus);
router.get('/TaskEvaluation/:id',TaskController.GetOneTaskEvaluation);
router.get('/GetNumberStudentByTaskEvaluation/:id',TaskController.GetNumberStudentByTaskEvaluation);
router.get('/GetNumberStudentWorkedTask/:id',TaskController.GetNumberStudentWorkedTask);
router.get('/GetNumberStudentAssignedTask/:id',TaskController.GetNumberStudentAssignedTask);
router.get('/getNumberTaskAssigned/:idUserr',TaskController.getNumberTaskAssigned);
router.get('/getNumberTaskWorked/:idUserr',TaskController.getNumberTaskWorked);
router.get('/AverageScore/:id',TaskController.getAverageTaskScore);
router.get('/getAverageScoreTaskByStudentAndClass/:idUser/:id',TaskController.getAverageScoreTaskByStudentAndClass);

