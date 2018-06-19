const { user } = require('../../Entity/index')
const Op = require('sequelize')
const Delete = {};

Delete.destory = async (model, data, callback) => {
  console.log('userRows create')
  return await model.destory({
    where : { username: data.username }
  })
  .then(result => {
    callback(result)
  })
  .catch(err => {
    callacb(err)
  })
}

Delete.drop = async (model, data, callback) => {
  return model.drop()
  .then(result => {
    callback(result)
  })
  .catch(err => {
    callback(err)
  })
}

module.exports = Delete