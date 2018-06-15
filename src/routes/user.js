const _ = require('lodash')
var express = require('express');
var router = express.Router();
const { UserModel } = require('../models/user')

router.route('/')
  .get(function(req, res, next) {
    const result = UserModel.findAll(result => {
      console.log(_.map(result, v => {
        return v.dataValues
      }))
      res.json(result[0].dataValues);
      next(1007);
    })
     
  })
  .post(function(req, res, next) {
    
    UserModel.create({
      password: '1234',
    })
    .then((result)  => {
      res.json(result)
    })
    .catch(function(err) {
      console.log(err)
      next(1006)
    });
  });

router.route('/:id')
  // .get((req, res, next) => {
  //   UserModel.findById(req.params.id, result => {
  //     console.log(result)
  //     res.json(result)
  //   }).then()
  //   .catch()
  // })
  // .get((req, res, next) => {
  //   UserModel.findOrCreate(req.params.id, result => {
  //     console.log(result)
  //     res.json(result)
  //     next(1008)
  //   }).then()
  //   .catch()
  // })
  // .get((req, res, next) => {
  //   UserModel.findAll(result => {
  //     console.log(result)
  //     res.json(result)
  //     next(1008)
  //   }).then()
  //   .catch()
  // })
  .get((req, res, next) => {
    UserModel.findAndCountAll(result => {
      console.log(result)
      res.send(result)
    })
    .then(result => {
      next(1008)
    })
    .catch()
  })
module.exports = router;
