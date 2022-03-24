var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const userRoute = require('./routes/User') 
const bodyparser = require("body-parser")

require('dotenv/config');
//------------la modéfication --------------------
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var mongoose=require('mongoose');
var config=require('./Database/db.json')
mongoose.connect(config.mongo.uri,{useNewUrlParser: true,useUnifiedTopology: true},()=>console.log("CONNETED DB"));




//-------------------------------------------
var app = express();

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

app.use('/user', userRoute);

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

module.exports = app;
