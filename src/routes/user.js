const _ = require('lodash')
const express = require('express');
const router = express.Router();

const { user, book } = require('../Entity/index')
const { Insert, Delete, Select, Update } = require('../models/methods')

router.route('/')
  .get(function(req, res, next) {
    const data = req.body
    const result = Insert.create(user, data, result => {
      res.json(result[0].dataValues);
      next(1007);
    })
  })

  .post(function(req, res, next) {
    Insert.create(user, { password: '1234' }, result => {
      console.log(_.map(result, v => {
        return v.dataValues
      }))
      res.json(result);
      next(1007);
    })
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
      res.send(result)
    })
    .then(result => {
      next(1008)
    })
    .catch()
  })
module.exports = router;
