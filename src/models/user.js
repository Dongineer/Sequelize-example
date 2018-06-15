const { user, book } = require('../Entity/index')
const Op = require('sequelize')
const UserModel = {}

UserModel.create = async function (data) {
  console.log('UserModel create', data.username)
  return await user.create({
    password: data.password,
  })
}

// attributes는 어떤 컬럼속성을  가져올 것인지 정해줍니다.
UserModel.findAll = (callback) => {
  return user.findAll({
    // attributes: ['id', 'password'], // select id, password ~
    // attributes: ['user_id', ['password', 'pw']] // select id, password as pw
    attributes: [[Op.fn('count', Op.col('user_id')), 'no-id']]
  })
  .then(result => {
    // console.log('FindAll result', result)
    callback(result)
  })
  .catch(err => {
    console.log(err)
    callback(err)
  })
}

// 하나의 로우를 찾는 메소드이며 where 절을 통해 원하는 조건을 생성할 수 있습니다.
UserModel.findOne = (data, callback) => {
  return user.findOne({ where : { password : '123'}})
    .then(result => {
      callback(result)
    })
    .catch(err => {
      callback(err)
    })
}

// 아이디를 통해 하나의 로우를 찾는 메소드 입니다.
UserModel.findById = (data, callback) => {
  return user.findById(data)
    .then(result => {
      // console.log('FindAll result', result)
      callback(result)
    })
    .catch(err => {
      console.log(err)
      callback(err)
    })
}

// 조회를 시도하고 원하는 결과가 없을 경우 로우를 생성합니다.
UserModel.findOrCreate = (data, callback) => {
  return user.findOrCreate(
    {
      where : { user_id : data },
      defaults: { password: '5555' }
    })
    .spread((user, create) => {
      user && callback(user)
      create && callback(create)
    })
    .catch(err => {
      callback(err)
    })
  }

/*
  conbines findAll and count 조회와 카운트의 혼합형 입니다.

  count - integer, total number record matching the where clause and other filters due to associations,
          within the limit and offset range
          정수로 반환되며 레코드의 총 숫자를 반환합니다. 
  rows - an array of objects, the records matching the where clause and other filters due to associations,
         within the limit and offest range
         배열객체로 반환 됩니다.
  
  Offset과 limit를 통해 두가지 모두 제한을 줄 수 있습니다.
*/

// UserModel.findAndCountAll = (callback) => {
//   return user.findAndCountAll({
//     where : { 
//       password : {
//         [Op.like]: 'foo%'
//       },
//     },
//   })
//   .then(result => {
//     console.log(result.count)
//     console.log(result.rows)
//     callback(result)
//   })
// }

UserModel.findAndCountAll = (callback) => {
  return user.findAndCountAll({
   include: [
     { model: book, required: true },
   ],
   limit: 1
  })
  .then(result => {
    console.log(result.count)
    console.log(result.rows)
    callback(result)
  })
}


module.exports = {
  UserModel,
}