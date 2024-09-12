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
router.post('/get', auth.authenticateToken, checkRole.checkRoleStudent, (req, res)=> {
    let tasks = req.body;
    let query = "SELECT * FROM `tasks`ts INNER JOIN `diploma practice` dp ON(dp.`ID` = ts.`diplomapractice_id`) INNER JOIN `user` us ON(us.`ID` = dp.`student_id`) WHERE us.`login` = ?"
    connection.query(query,[tasks.login], (err, result)=> {
        if(!err){
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })
})

// // add
// router.post('/add', auth.authenticateToken, checkRole.checkRoleAdmin, (req,res) => {
//     let speciality = req.body;
//     query = "select * from specialty where name=?"
//     connection.query(query, [speciality.name], (err, results) => {
//         if (!err) {
//             if(results.length <= 0) {
//                 query = "INSERT INTO `specialty` (`name`) VALUES (?);"
//                 connection.query(query, [speciality.name], (err, results) => {
//                     if(!err) {
//                         return res.status(200).json({message: "Successfully Added New Speciality"});
//                     } else {
//                         return res.status(500).json(err);
//                     }
//                 })
//             } else {
//                 return res.status(400).json({message: "Speciality Already Exist"});
//             }
//         } else {
//             return res.status(500).json(err);
//         }
//     })
// })
// // update
// router.patch('/update', auth.authenticateToken, checkRole.checkRoleAdmin, (req, res)=> {
//     let speciality = req.body;
//     query = "select * from specialty where name=?"
//     connection.query(query, [speciality.name], (err, results) => {
//         if (!err) {
//             if(results.length <= 0) {
//                 let query = "UPDATE `specialty` SET `name` = ? WHERE `specialty`.`ID` = ?"
//                 connection.query(query,[speciality.name, speciality.id], (err, result)=> {
//                     if(!err){
//                         if (result.afffectedRows == 0) {
//                             return res.status(404).json({message : "Speciality ID does not found"});
//                         } else {
//                             return res.status(200).json({message : "Speciality Updated Successfully"});
//                         }
//                     } else {
//                         return res.status(500).json(err);
//                     }
//                 })
//             } else {
//                 return res.status(400).json({message: "Speciality Already Exist"});
//             }
//         } else {
//             return res.status(500).json(err);
//         }
//     })
// })
// // delete
// router.post('/delete', auth.authenticateToken, checkRole.checkRoleAdmin, (req, res)=> {
//     let speciality = req.body;
//     let query = "delete from `specialty` where `specialty`.`ID` = ?";
//     connection.query(query, [speciality.id], (err, result) => {
//         if(!err) {
//             return res.status(200).json({message : "Speciality Deleted Successfully"})
//         } else {
//             return res.status(500).json(err);
//         }
//     })
// })
// // getByID
// router.get('/getById/:id', auth.authenticateToken, checkRole.checkRoleAdmin, (req, res)=> {
//     const id = req.params.id
//     let query = "select * from specialty where ID = ?"
//     connection.query(query, [id], (err, result)=> {
//         if(!err){
//             return res.status(200).json(result[0]);
//         } else {
//             return res.status(500).json(err);
//         }
//     })
// })

module.exports = router
