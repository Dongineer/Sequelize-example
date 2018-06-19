module.exports = (sequelize, DataType) => {
  return sequelize.define('infomation', {
    name: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataType.STRING(200),
      allowNull: true,
    }},{
      classMethods: {},
      tableName: 'infomation',
      underscored: true,
      timestamps: true,
    })
}