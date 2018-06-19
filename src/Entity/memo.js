module.exports = (sequelize, DataType) => {
  return sequelize.define('memo', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataType.STRING(200),
      allowNull: true,
    },}
    ,{
      classMethods: {},
      tableName: 'memo',
      underscored: true,
      timestamps: true,
    })
}