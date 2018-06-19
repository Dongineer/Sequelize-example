module.exports = (sequelize, DataType) => {
  return sequelize.define('book', {
    username: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bookname: {
      type: DataType.STRING(45),
      allowNull: false,
    },
    price: {
      type: DataType.INTEGER,
      allowNull: false,
    }},{
      classMethods: {},
      tableName: 'book',
      underscored: true,
      freezeTableName: true,
      timestamps: false,
    })
}