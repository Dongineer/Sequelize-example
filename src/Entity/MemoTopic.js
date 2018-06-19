module.exports = (sequelize, DataType) => {
  return sequelize.define('MemoTopic', {
    topic_id: {
      type: DataType.INTEGER,
      primaryKey: true,
    },
    memo_id: {
      type: DataType.INTEGER,
      primaryKey: true,
    }},{
      classMethods: {},
      tableName: 'MemoTopic',
      underscored: true,
      timestamps: true,
    })
}