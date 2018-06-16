const { user, book } = require('../../Entity/index')
const Op = require('sequelize')
const select = {}
// attributes는 어떤 컬럼속성을  가져올 것인지 정해줍니다.
select.findAll = (callback) => {
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
select.findOne = (data, callback) => {
  return user.findOne({ where : { password : '123'}})
    .then(result => {
      callback(result)
    })
    .catch(err => {
      callback(err)
    })
}

/*
  아이디를 통해 하나의 로우를 찾는 메소드 입니다.
  뭔가... 컬럼명이 id인 친구들을 찾아주는 것 같다.
*/
select.findById = (data, callback) => {
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
/*
 조회를 시도하고 원하는 결과가 없을 경우 로우를 생성합니다.
 find or create 사용시에는 결과값으로 2개의 인자가 반환되기 때문에
 spread 메소드를 사용합니다.
*/
select.findOrCreate = (data, callback) => {
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

select.findAndCountAll = (callback) => {
  return user.findAndCountAll({
    where : { 
      password : {
        [Op.like]: 'foo%'
      },
    },
  })
  .then(result => {
    console.log(result.count)
    console.log(result.rows)
    callback(result)
  })
}

/*
  여러가지 where 조건
  where: {
    id: {
      [Op.and]: {a: 5},           // AND (a = 5)
      [Op.or]: [{a: 5}, {a: 6}],  // (a = 5 OR a = 6)
      [Op.gt]: 6,                // id > 6
      [Op.gte]: 6,               // id >= 6
      [Op.lt]: 10,               // id < 10
      [Op.lte]: 10,              // id <= 10
      [Op.ne]: 20,               // id != 20
      [Op.between]: [6, 10],     // BETWEEN 6 AND 10
      [Op.notBetween]: [11, 15], // NOT BETWEEN 11 AND 15
      [Op.in]: [1, 2],           // IN [1, 2]
      [Op.notIn]: [1, 2],        // NOT IN [1, 2]
      [Op.like]: '%hat',         // LIKE '%hat'
      [Op.notLike]: '%hat',       // NOT LIKE '%hat'
      [Op.iLike]: '%hat',         // ILIKE '%hat' (case insensitive)  (PG only)
      [Op.notILike]: '%hat',      // NOT ILIKE '%hat'  (PG only)
      [Op.overlap]: [1, 2],       // && [1, 2] (PG array overlap operator)
      [Op.contains]: [1, 2],      // @> [1, 2] (PG array contains operator)
      [Op.contained]: [1, 2],     // <@ [1, 2] (PG array contained by operator)
      [Op.any]: [2,3]            // ANY ARRAY[2, 3]::INTEGER (PG only)
    },
*/

select.findAndCountAllJoin = (callback) => {
  return user.findAndCountAll({
  // include는 config에서 정해준 관계에 따라 join을 가능하도록 해주는 명령어
   include: [
    //  { model: book, required: true }, // required 명령어를 사용하면  inner join을 하게 된다.
    /* where 절에 들어있는 컬럼은 기본적으로 required 상태가 된다. */
     { model: book, where : { user_id: true } }, 
   ],
   limit: 1
  })
  .then(result => {
    callback(result)
  })
}

module.exports = select