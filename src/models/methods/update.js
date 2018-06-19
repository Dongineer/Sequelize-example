const { user, book } = require('../../Entity/index')
const Op = require('sequelize')
const update = {}

update.update = async (model, data, callback) => {
  return model.update(
    { username : 'dongineer'},
    { where : { username : 'dongsu'} },
  )
  .then(result => {
    callback(result)
  })
  .catch(err => {
    callback(err)
  })
}
module.exports = update