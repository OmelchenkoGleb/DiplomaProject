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
router.post('/get', auth.authenticateToken, (req, res)=> {
    let tasks = req.body;
    let query = "SELECT ts.`from_date` as from_date, ts.`to_date` as to_date, ts.`ID` as `ID`, ts.`name` as `name`, ts.`status` as `status` FROM `tasks`ts INNER JOIN `diploma practice` dp ON(dp.`ID` = ts.`diplomapractice_id`) INNER JOIN `user` us ON(us.`ID` = dp.`student_id`) WHERE us.`login` = ?"
    connection.query(query,[tasks.login], (err, result)=> {
        if(!err){
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.post('/add', auth.authenticateToken, (req,res) => {
    let tasks = req.body;
    query = "INSERT INTO `tasks` (`ID`, `name`, `from_date`, `to_date`, `diplomapractice_id`, `status`) VALUES (NULL, ?, ?, ?, ( SELECT dp.`ID` FROM `diploma practice` dp INNER JOIN `user` us ON (dp.`student_id` = us.`ID`) WHERE us.`login` = ? ), 'false')"
    connection.query(query, [tasks.name,tasks.from_date,tasks.to_date, tasks.email], (err, results) => {
        if(!err) {
            return res.status(200).json({message: "Successfully Added New Task"});
        } else {
            return res.status(500).json(err);
        }
    })
})

router.patch('/update', auth.authenticateToken, (req,res) => {
    let tasks = req.body;
    console.log(tasks);
    query = "UPDATE `tasks` SET `name` = ?, `from_date` = ?, `to_date` = ? WHERE `tasks`.`ID` = ?;"
    connection.query(query, [tasks.name, tasks.from_date, tasks.to_date, tasks.id], (err, results) => {
        if(!err) {
            return res.status(200).json({message: "Successfully Updated Task"});
        } else {
            return res.status(500).json(err);
        }
    })
})

router.patch('/changeStatus', auth.authenticateToken, (req,res) => {
    let tasks = req.body;
    console.log(tasks);
    query = "UPDATE `tasks` SET `status` = ? WHERE `tasks`.`ID` = ?"
    connection.query(query, [tasks.status, tasks.id], (err, results) => {
        if(!err) {
            return res.status(200).json({message: "Successfully Updated Status Task"});
        } else {
            return res.status(500).json(err);
        }
    })
})

// delete
router.post('/delete', auth.authenticateToken, (req, res)=> {
    let tasks = req.body;
    console.log(tasks);
    let query = "delete from `tasks` where `tasks`.`ID` = ?";
    connection.query(query, [tasks.id], (err, result) => {
        if(!err) {
            return res.status(200).json({message : "Tasks Deleted Successfully"})
        } else {
            return res.status(500).json(err);
        }
    })
})

module.exports = router


