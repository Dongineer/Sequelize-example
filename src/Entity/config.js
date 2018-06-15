'use strict';


// N:M 관계를 형성할 때 중간 테이블을 만들어 주는 역할을 한다.
// method는 belongToMany()
// Memo.belongsToMany(Label, { through: 'MemoLabel' });
// Label.belongsToMany(Memo, { through: 'MemoLabel' });

// 이 뿐만 아니라 1:1 관계를 위한 hasOne(), belongsTo(), 1:M 관계를 위한 hasMany() 메소드도 지원한다.
// 참고로 DELETE 시에 CASCADE되는 것은 N:M 관계일 때 뿐이며, 1:1, 1:M 관계에서는 SET NULL이다.


var config = {
  initAssociations: function(db) {
    db.user.hasMany(db.book, { foreignKey: 'user_id' });
    db.book.belongsTo(db.user, { foreignKey: 'user_id'})
  },
  initHooks: function(db) {
    db.book.hook('beforeCreate', function() {
      //TODO; create작업 전에 해야할 사항들.
    });

    db.book.beforeCreate(function() {
      //TODO; create작업 전에 해야할 사항들.
    });
  }
};

module.exports = config;
