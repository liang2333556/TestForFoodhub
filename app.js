var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const foods = require("./routes/foods");
const products=require("./routes/products");
const regist=require("./routes/regist");
const log=require("./routes/log");
const search=require("./routes/search");
const userEssay=require("./routes/userEssay");
const order=require("./routes/order");
const comment=require("./routes/comment");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.get('/foods', foods.findAll);
app.get('/foods/:id', foods.findOne);
app.post('/foods',foods.addFood);
app.put('/foods/:id/likes', foods.incrementLikes);
app.delete('/foods/:id', foods.deleteFood);

app.get('/products', products.findAll);
app.get('/products/:id', products.findOne);
app.post('/products',products.addProduct);
app.put('/products/:id/likes', products.incrementLikes);
app.delete('/products/:id', products.deleteProduct);

app.post('/regist',regist.addUser);
app.post('/log',log.logUser);

app.post('/search',search.searchProduct);
app.post('/order',order.addCart);

app.get('/userEssay',userEssay.findAll);
app.get('/userEssay/:id',userEssay.findOne);
app.post('/userEssay',userEssay.addEssay);
app.put('/userEssay/:id/likes',userEssay.incrementLikes);
app.delete('/userEssay/:id',userEssay.deleteEssay);

app.post('/comment',comment.addComment);



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
