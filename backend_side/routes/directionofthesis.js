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

// БАЗОВІ CRUD ЗАПИТИ
// get
router.get('/get', auth.authenticateToken, checkRole.checkRoleAdmin, (req, res)=> {
  let query = "select * from directionofthesis"
  connection.query(query, (err, result)=> {
    if(!err){
      return res.status(200).json(result);
    } else {
      return res.status(500).json(err);
    }
  })
})
// add
router.post('/add', auth.authenticateToken, checkRole.checkRoleAdmin, (req,res) => {
  let directionofthesis = req.body;
  query = "select * from directionofthesis where name=?"
  connection.query(query, [directionofthesis.name], (err, results) => {
    if (!err) {
      if(results.length <= 0) {
        query = "INSERT INTO `directionofthesis` (`name`) VALUES (?);"
        connection.query(query, [directionofthesis.name], (err, results) => {
          if(!err) {
            return res.status(200).json({message: "Successfully Added New Direction Of Thesis"});
          } else {
            return res.status(500).json(err);
          }
        })
      } else {
        return res.status(400).json({message: "Direction Of Thesis Already Exist"});
      }
    } else {
      return res.status(500).json(err);
    }
  })
})
// update
router.patch('/update', auth.authenticateToken, checkRole.checkRoleAdmin, (req, res)=> {
  let directionofthesis = req.body;
  query = "select * from directionofthesis where name=?"
  connection.query(query, [directionofthesis.name], (err, results) => {
    if (!err) {
      if(results.length <= 0) {
        let query = "UPDATE `directionofthesis` SET `name` = ? WHERE `directionofthesis`.`ID` = ?"
        connection.query(query,[directionofthesis.name, directionofthesis.id], (err, result)=> {
          if(!err){
            if (result.afffectedRows == 0) {
              return res.status(404).json({message : "Direction Of Thesis ID does not found"});
            } else {
              return res.status(200).json({message : "Direction Of Thesis Updated Successfully"});
            }
          } else {
            return res.status(500).json(err);
          }
        })
      } else {
        return res.status(400).json({message: "Direction Of Thesis Already Exist"});
      }
    } else {
      return res.status(500).json(err);
    }
  })
})
// delete
router.delete('/delete/:id', auth.authenticateToken, checkRole.checkRoleAdmin, (req, res)=> {
  const id = req.params.id;
  let query = "delete from `directionofthesis` where `specialty`.`ID` = ?";
  connection.query(query, [id], (err, result) => {
    if(!err) {
      return res.status(200).json({message : "Speciality Deleted Successfully"})
    } else {
      return res.status(500).json(err);
    }
  })
})
// getByID
router.get('/getById/:id', auth.authenticateToken, checkRole.checkRoleAdmin, (req, res)=> {
  const id = req.params.id
  let query = "select * from directionofthesis where ID = ?"
  connection.query(query, [id], (err, result)=> {
    if(!err){
      return res.status(200).json(result[0]);
    } else {
      return res.status(500).json(err);
    }
  })
})

module.exports = router
