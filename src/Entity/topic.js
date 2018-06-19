module.exports = (sequelize, DataType) => {
  return sequelize.define('topic', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataType.STRING(200),
      allowNull: true,
    }},{
      classMethods: {},
      tableName: 'topic',
      underscored: true,
      timestamps: true,
    })
}