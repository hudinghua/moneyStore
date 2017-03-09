var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var ejs = require('ejs');
var bodyParser = require('body-parser');
const domain = require('domain');
var compression = require('compression');
var session = require('express-session');
var log4js = require('log4js');

var index = require('./routes/index');
var sigin = require('./routes/sigin');
var routeMap = require('./routes/routeMap');

var app = express();
app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
/*app.set('view engine', 'jade');*/

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

log4js.configure({
  appenders: [
    { type: 'console' },
    {
      type: 'file',
      filename: 'logs/log.log',
      pattern: "_yyyy-MM-dd",
      maxLogSize: 20480,
      backups:3,
      category: 'bbposLog' 
    }
  ],
  replaceConsole: true,
  levels: { bbposLog:'INFO' }
});
var logger = log4js.getLogger('bbposLog');
app.use(log4js.connectLogger(logger, {level:log4js.levels.INFO,format:':method :status :url :response-time ms'}));
global.LOGGER = logger;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('bbposSession'));
app.use(express.static(path.join(__dirname, 'public')));

//Asynchronous code exception handling 
app.use(function(req,res,next){
    var d = domain.create();
    d.on('error',function(err){
        err.status = 500;
        d.dispose();
        next(err);
    });
    d.add(req);
    d.add(res);
    d.run(next);
});

app.use(session({
    secret: 'bbposSession',
    name: new Date().getTime()+'',
    cookie: {
      maxAge: 60000 * 30//10000//
    },
    resave: true,
    rolling:true,
    saveUninitialized: true
}));

//Filter request interceptor 
app.use(function(req,res,next){
    var url = req.originalUrl;
    if (url == '/signin' && req.session.loginName) {
        return res.redirect('/');
    }
    if (url === '/signIn') {
        next();
    }else{
        if (!req.session.loginName && url != '/signin') {
            return res.redirect('/signin');
        }else{
            next();
        }
    }
});

app.use('/', index);
app.use('/signin', sigin);
app.use('/', routeMap);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  	var err = new Error('Not Found');
  	err.status = 404;
  	next(err);
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
