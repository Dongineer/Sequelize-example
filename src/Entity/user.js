module.exports = (sequelize, DataType) => {
  return sequelize.define('user', {
    user_id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    password: {
      type: DataType.STRING(45),
      allowNull: true,
    }},{
      classMethods: {},
      tableName: 'user',
      underscored: true,
      timestamps: false,
    })
}