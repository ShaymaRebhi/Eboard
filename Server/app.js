var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const userRoute = require('./routes/User')
var forumRouter = require('./routes/Forum');
const CommentRoute = require('./routes/Comment')
const quizRoute = require('./routes/Quiz')
const optionRoute = require('./routes/Option')
const questionRoute = require('./routes/QuestionQuiz')
const taskRoute = require('./routes/Task')
const ChatRoute = require('./routes/Chat')
const bodyparser = require("body-parser")
const socket=require('socket.io')
const ReclamationRoute = require('./routes/Reclamations') 
const classRoute = require('./routes/Class.js')
const StudentRoute = require('./routes/Student')
const TeacherRoute = require('./routes/Teacher')
const OrganizationRoute = require('./routes/Organization')
const courses_route = require("./routes/Courses.route")
const ThemeController = require("./routes/ThemeController");
const CommentCourse = require("./routes/CommentCourse");
const SchedulerRouter = require("./routes/Scheduler.js");
const InvitationClassRouter = require("./routes/InvitationClass.js");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const Grid = require("gridfs-stream");
require('dotenv/config');
let gfs;
//------------la modéfication --------------------

var mongoose=require('mongoose');

var config=require('./Database/db.json')
mongoose.connect(config.mongo.uri,{useNewUrlParser: true,useUnifiedTopology: true},()=>console.log("CONNETED DB"));

const conn = mongoose.connection;
conn.once("open", function () {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});



//-------------------------------------------
var app = express();
// media routes
app.get("/file/:filename", async (req, res) => {
  try {
      const file = await gfs.files.findOne({ filename: req.params.filename });
      const readStream = gfs.createReadStream(file.filename);
      readStream.pipe(res);
  } catch (error) {
      res.send("not found");
  }
});

app.delete("/file/:filename", async (req, res) => {
  try {
      await gfs.files.deleteOne({ filename: req.params.filename });
      res.send("success");
  } catch (error) {
      console.log(error);
      res.send("An error occured.");
  }
});
// view engine setup
app.use(cors());
app.use(cors({origin: '*'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser());
app.use(express.json({limit:'200mb'}));
app.use(bodyparser.urlencoded({extended:true}));
app.use('/uploadsFolder', express.static(path.join(__dirname, '/uploads')));

app.use('/chat',ChatRoute);
app.use('/user', userRoute);
app.use('/quiz', quizRoute);
app.use('/option', optionRoute);
app.use('/question', questionRoute);
app.use('/task', taskRoute);
app.use('/forum',forumRouter);
app.use('/reclamation',ReclamationRoute);
app.use('/comment',CommentRoute);
app.use('/class',classRoute);
app.use('/student',StudentRoute);
app.use('/teacher',TeacherRoute);
app.use('/organization',OrganizationRoute);
app.use('/invitationclass',InvitationClassRouter);
app.use("/courses", courses_route);
app.use("/theme", ThemeController);
app.use("/coursesComment", CommentCourse);
app.use("/scheduler", SchedulerRouter);

app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname, '/views/index.html'));
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {


  // Pass to next layer of middleware
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const newCourses = []
async function fetchData(url){
    try {
        const response = await fetch(url)
        const data = await response.text()
        getCourses(data)
    }catch (error) {
        console.error(error)
    }
}
fetchData("https://www.udemy.com/courses/development/")
async function getCourses(html){
    const $ = cheerio.load(html)
    $(".popper--popper--2r2To",html).each(function () {
        const newCourse = {
            id: newCourses.length + 1 ,
            title : $(this).text().trim(),
            image: $(this).find(".course-card--course-image--3QvbQ").text(),
            url :`https://www.udemy.com/courses${$(this).children("a").attr("href")}`
        }
        newCourses.push(newCourse)
    })
    try {
        // fs.writeFile("Courses.json", JSON.stringify(newCourses))
    } catch (error){
        console.error(error)
    }
}
module.exports = app;