// 引入模块
var createError = require('http-errors');
var express = require('express');
var path = require('path');
// 引入 cookie 模块
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 引入 session 模块
var session = require('express-session')


// 引入 路由文件
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 设置 cookie
app.use(cookieParser());

// 设置 session
app.use(session({
	resave: true,  // 新增
	saveUninitialized: true,  // 新增
	// secret 加密用的密钥
	secret : 'suiji',
	// cookie 生命周期
	cookie:{
		// 单位 毫秒
		maxAge:1000*60*30
	}
}))


app.use(function(req,res,next){
	// res.locals 本地存储信息的对象
	// 设置默认信息 
	res.locals.user = '';
	res.locals.user2 = '';
	if(req.session.user){
		res.locals.user = req.session.user;
	}
	if(req.session.user2){
		res.locals.user2 = req.session.user2;
	}
	next();
})

// 静态资源库
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

// 前台路由（游客的页面）
app.use('/', indexRouter);
// 后台（管理员的页面）
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
