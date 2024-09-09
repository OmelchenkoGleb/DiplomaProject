// API для роботи із таблицею faculty

const express = require('express')
const connection = require('../connection');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

//authentification
var auth = require('../services/authentification')
//checkRoles
var checkRole = require('../services/checkRole')



router.get('/info', auth.authenticateToken , (req, res)=> {
  var specialityCount;
  var directionofthesisCount;

  console.log("test")

  var query = "SELECT COUNT(*) as specialtyCount FROM `specialty`"
  connection.query(query, (err, result)=> {
    console.log(err)
    if(!err){
      specialityCount = result[0].specialtyCount;
    } else {
      return res.status(500).json(err);
    }
  })

  query = "SELECT COUNT(*) as directionofthesisCount FROM `directionofthesis`"
  connection.query(query, (err, result)=> {
    console.log(err)
    if(!err){
      directionofthesisCount = result[0].directionofthesisCount;
      var data = {
        specialityCount: specialityCount,
        directionofthesisCount: directionofthesisCount
      }
      console.log(data);
      return res.status(200).json(data)
    } else {
      return res.status(500).json(err);
    }
  })
})


module.exports = router
