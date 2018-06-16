const { user, book } = require('../../Entity/index')
const Op = require('sequelize')
const insert = {}


insert.create = async function (model, data, callback) {
  console.log('UserModel create', data.username)
  return await model.create({
    password: data.password,
  })
  .then(result => {
    callback(result)
  })
}

module.exports = insert