var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const router = require('./routes')
const Entity = require('./Entity')
var app = express();

// statis directory settiong
// template engine ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

function configApp() {
  app.use(bodyParser.json({type: 'application/json'}));
  app.use(bodyParser.urlencoded({extended: false}));
  // app.use(fetcher()); // 아마 validator 인것 같다.
  app.use(cookieParser());
  app.use('/', router)
  app.use(express.static(path.join(__dirname, '/../public'))); // binding static files
}

configApp();

app.listen(4000, function() {
  console.log('Server is listening on port 4000');
});

module.exports = app;
