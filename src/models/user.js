const methods = require('../Entity/index')
const Op = require('sequelize')
const UserModel = {}

UserModel.create = async function (data) {
  console.log('UserModel create', data.username)
  return await user.create({
    password: data.password,
  })
}




module.exports = {
  UserModel,
}