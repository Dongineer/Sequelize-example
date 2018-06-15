var fs = require('fs');
var path = require('path');
var config = require('./config');
var Sequelize = require('sequelize');

const db = {}
const sequelize = new Sequelize(
  'sequelize_test', // 데이터베이스 이름
  'root', // 유저 명
  '', // 비밀번호
  {
    'host': 'localhost', // 데이터베이스 호스트
    'port': 3308,
    'dialect': 'mysql' // 사용할 데이터베이스 종류
  }
);

// 하나씩 파일을 캐싱해 두는 방식
// db['Publisher'] = sequelize.import(path.join(__dirname, 'publisher.js'));

// 디렉터리 내의 모든 파일을 순회하며 캐싱하는 방식이다.
fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js' && file !== 'config.js');
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });
config.initAssociations(db) // 모델간의 relation을 설정해주는 작업을 한다.
// config.initHooks(db); //hooks설정시 주석을 제거한다

db.user.sync().then(() => {
  db.book.sync();
});

//db.Publisher.drop();
//db.Publisher.sync({force: true});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
