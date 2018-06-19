const { user, book } = require('../../Entity/index')
const Op = require('sequelize')
const insert = {}


insert.create = async function (model, data, callback) {
  console.log('UserModel create')
  return await model.create({
    username: data.username,
    password: data.password,
  })
  .then(result => {
    callback(result)
  })
}

module.exports = insert