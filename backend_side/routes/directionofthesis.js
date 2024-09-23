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
  let query = "select dr.ID as id, us.`ID` as user_id, sp.`ID` as group_id, us.`Name` as user_name, sp.`Name` as group_name, dr.`name` as name from directionofthesis dr INNER JOIN `user` us ON(dr.`teacher_id` = us.`ID`) INNER JOIN `specialty` sp ON(dr.group_id = sp.`ID`)"
  connection.query(query, (err, result)=> {
    if(!err){
      return res.status(200).json(result);
    } else {
      return res.status(500).json(err);
    }
  })
})
router.post('/getForStudent', auth.authenticateToken, checkRole.checkRoleStudent, (req,res) => {
  let directionofthesis = req.body;
  console.log(directionofthesis);
  query = "select dr.ID as id, us.`ID` as user_id, sp.`ID` as group_id, us.`Name` as user_name, sp.`Name` as group_name, dr.`name` as name from directionofthesis dr INNER JOIN `user` us ON(dr.`teacher_id` = us.`ID`) INNER JOIN `specialty` sp ON(dr.group_id = sp.`ID`) WHERE dr.`group_id` = (SELECT gm.`specialty_id` from `group_member` gm INNER JOIN `user` us ON (us.`ID` = gm.`student_id`) WHERE us.`login` = ?)"
  connection.query(query, [directionofthesis.login], (err, results) => {
    if(!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  })
})

router.post('/getDirectionForTeacher', auth.authenticateToken, checkRole.checkRoleTeacher, (req,res) => {
  let directionofthesis = req.body;
  console.log(directionofthesis);
  query = "select dr.ID as id, us.`ID` as user_id, sp.`ID` as group_id, us.`Name` as user_name, sp.`Name` as group_name, dr.`name` as name from directionofthesis dr INNER JOIN `user` us ON(dr.`teacher_id` = us.`ID`) INNER JOIN `specialty` sp ON(dr.group_id = sp.`ID`) WHERE us.`login` = ?"
  connection.query(query, [directionofthesis.login], (err, results) => {
    if(!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  })
})
// add
router.post('/add', auth.authenticateToken, checkRole.checkRoleAdmin, (req,res) => {
  let directionofthesis = req.body;
  console.log(directionofthesis);
  query = "INSERT INTO `directionofthesis` (`ID`, `name`, `teacher_id`, `group_id`) VALUES (NULL, ?, ?, ?)"
  connection.query(query, [directionofthesis.name, directionofthesis.teacher_id, directionofthesis.group_id], (err, results) => {
    if(!err) {
      return res.status(200).json({message: "Successfully Added New Direction Of Thesis"});
    } else {
      return res.status(500).json(err);
    }
  })
})
// update
router.patch('/update', auth.authenticateToken, checkRole.checkRoleAdmin, (req, res)=> {
  let directionofthesis = req.body;
  let query = "UPDATE `directionofthesis` SET `name` = ?, `teacher_id` = ?, `group_id` = ? WHERE `directionofthesis`.`ID` = ?"
  connection.query(query,[directionofthesis.name, directionofthesis.teacher_id, directionofthesis.group_id, directionofthesis.id], (err, result)=> {
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
})
// delete
router.post('/delete', auth.authenticateToken, checkRole.checkRoleAdmin, (req, res)=> {
  let directionofthesis = req.body;
  let query = "delete from `directionofthesis` where `directionofthesis`.`ID` = ?";
  connection.query(query, [directionofthesis.id], (err, result) => {
    if(!err) {
      return res.status(200).json({message : "Direction Of Thesis Deleted Successfully"})
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
