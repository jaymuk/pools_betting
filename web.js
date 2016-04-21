var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/build/public"));
// set the view engine to ejs
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
  res.render('index');
})
app.listen(process.env.PORT || 5000);