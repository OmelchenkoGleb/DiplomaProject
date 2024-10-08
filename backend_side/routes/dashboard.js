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
  var diplomapracticeCount;


  var query = "SELECT COUNT(*) as specialtyCount FROM `specialty`"
  connection.query(query, (err, result)=> {
    if(!err){
      specialityCount = result[0].specialtyCount;
    } else {
      return res.status(500).json(err);
    }
  })

  query = "SELECT COUNT(*) as diplomapracticeCount FROM `diploma practice`"
  connection.query(query, (err, result)=> {
    if(!err){
      diplomapracticeCount = result[0].diplomapracticeCount;
    } else {
      return res.status(500).json(err);
    }
  })

  query = "SELECT COUNT(*) as directionofthesisCount FROM `directionofthesis`"
  connection.query(query, (err, result)=> {
    if(!err){
      directionofthesisCount = result[0].directionofthesisCount;
      var data = {
        specialityCount: specialityCount,
        directionofthesisCount: directionofthesisCount,
        diplomapracticeCount: diplomapracticeCount
      }
      return res.status(200).json(data)
    } else {
      return res.status(500).json(err);
    }
  })
})


router.post('/infoForStudent', auth.authenticateToken , (req, res)=> {
  var tasksCount;
  var completeTasksCount;
  let info_regarding_student = req.body;

  var query = "SELECT COUNT(*) as tasksCount FROM `tasks`ts INNER JOIN `diploma practice` dp ON(dp.`ID` = ts.`diplomapractice_id`) INNER JOIN `user` us ON(us.`ID` = dp.`student_id`) WHERE us.`login` = ?"
  connection.query(query,[info_regarding_student.login], (err, result)=> {
    if(!err){
      tasksCount = result[0].tasksCount;
    } else {
      return res.status(500).json(err);
    }
  })


  query = "SELECT COUNT(*) as tasksCount FROM `tasks`ts INNER JOIN `diploma practice` dp ON(dp.`ID` = ts.`diplomapractice_id`) INNER JOIN `user` us ON(us.`ID` = dp.`student_id`) WHERE us.`login` = ? AND ts.`status` = 'true'"
  connection.query(query,[info_regarding_student.login], (err, result)=> {
    if(!err){
      completeTasksCount = result[0].tasksCount;
      var data = {
        tasksCount: tasksCount,
        completeTasksCount: completeTasksCount
      }
      return res.status(200).json(data)
    } else {
      return res.status(500).json(err);
    }
  })
})


router.post('/infoForTeacher', auth.authenticateToken , (req, res)=> {
  var newThemeCount
  var practiceCount;

  let info_regarding_teacher = req.body;
  var query = "SELECT COUNT(*) as practiceCount FROM `diploma practice` dp INNER JOIN `directionofthesis` dr ON (dr.`ID` = dp.`directionofthesis_id`) INNER JOIN `specialty` sp ON (sp.`ID` = dr.`group_id`) INNER JOIN `user` uss ON (uss.`ID` = dr.`teacher_id`) WHERE uss.`login` = ? AND dp.`student_id` IS NULL"
    connection.query(query,[info_regarding_teacher.login], (err, result)=> {
      if(!err){
        practiceCount = result[0].practiceCount;
      } else {
        return res.status(500).json(err);
      }
    })


    query = "SELECT COUNT(*) as newThemeCount FROM `diploma practice` dp INNER JOIN `user` us ON (us.`ID` = dp.`student_id`) INNER JOIN `directionofthesis` dr ON (dr.`ID` = dp.`directionofthesis_id`) INNER JOIN `specialty` sp ON (sp.`ID` = dr.`group_id`) INNER JOIN `user` uss ON (uss.`ID` = dr.`teacher_id`) WHERE uss.`login` = ?"
    connection.query(query,[info_regarding_teacher.login], (err, result)=> {
      if(!err){
        newThemeCount = result[0].newThemeCount;
        var data = {
          newThemeCount: practiceCount,
          practiceCount: newThemeCount
        }
        return res.status(200).json(data)
      } else {
        return res.status(500).json(err);
      }
    })
})


module.exports = router
