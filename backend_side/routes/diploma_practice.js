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
    // let query = "SELECT dp.`ID`, us.`name` as student_name, uss.`name` as teacher_name, sp.`name` as specialty_name, dr.`name` as directionofthesis_name, `description` FROM `diploma practice` dp INNER JOIN `user` us ON (us.`ID` = dp.`student_id`) INNER JOIN `user` uss ON (uss.`ID` = dp.`teacher_id`) INNER JOIN `specialty`sp ON (sp.`ID` = dp.`specialty_id`) INNER JOIN `directionofthesis` dr ON (dr.`ID` = dp.`directionofthesis_id`)"
    let query = "SELECT dp.`teacher_id` as teacherID, dp.`student_id` as studentID, dp.`specialty_id` as specialityId, dp.`directionofthesis_id` as directionId, dp.`ID`, us.`name` as student_name, uss.`name` as teacher_name, sp.`name` as specialty_name, dr.`name` as directionofthesis_name, `description` FROM `diploma practice` dp INNER JOIN `user` us ON (us.`ID` = dp.`student_id`) INNER JOIN `user` uss ON (uss.`ID` = dp.`teacher_id`) INNER JOIN `specialty`sp ON (sp.`ID` = dp.`specialty_id`) INNER JOIN `directionofthesis` dr ON (dr.`ID` = dp.`directionofthesis_id`)";
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
    let diplomapractice = req.body;
    query = "select * from `diploma practice` where student_id = ?"
    connection.query(query, [diplomapractice.student_id], (err, results) => {
        if (!err) {
            if(results.length <= 0) {
                query = "INSERT INTO `diploma practice` (`ID`, `specialty_id`, `directionofthesis_id`, `description`, `student_id`, `teacher_id`) VALUES (NULL, ?, ?, ?, ?, ?);"
                connection.query(query, [diplomapractice.speciality_id, diplomapractice.directionofthesis_id, diplomapractice.description, diplomapractice.student_id, diplomapractice.teacher_id], (err, results) => {
                    if(!err) {
                        return res.status(200).json({message: "Successfully Added New Practice"});
                    } else {
                        return res.status(500).json(err);
                    }
                })
            } else {
                return res.status(400).json({message: "Student Already Exist"});
            }
        } else {
            return res.status(500).json(err);
        }
    })
})
// update
router.patch('/update', auth.authenticateToken, checkRole.checkRoleAdmin, (req, res)=> {
    let diplomapractice = req.body;
    query = "select * from `diploma practice` where student_id = ?  AND `diploma practice`.`ID` != ?"
    connection.query(query, [diplomapractice.student_id, diplomapractice.id], (err, results) => {
        if (!err) {
            if(results.length <= 0) {
                let query = "UPDATE `diploma practice` SET `specialty_id` = ?, `directionofthesis_id` = ?, `description` = ?, `student_id` = ?, `teacher_id` = ? WHERE `diploma practice`.`ID` = ?"
                connection.query(query,[diplomapractice.speciality_id, diplomapractice.directionofthesis_id, diplomapractice.description, diplomapractice.student_id, diplomapractice.teacher_id, diplomapractice.id], (err, result)=> {
                    if(!err){
                        if (result.afffectedRows == 0) {
                            return res.status(404).json({message : "Practice ID does not found"});
                        } else {
                            return res.status(200).json({message : "Practice Updated Successfully"});
                        }
                    } else {
                        return res.status(500).json(err);
                    }
                })
            } else {
                return res.status(400).json({message: "Student Already Exist"});
            }
        } else {
            return res.status(500).json(err);
        }
    })
})
// delete
router.post('/delete', auth.authenticateToken, checkRole.checkRoleAdmin, (req, res)=> {
    let speciality = req.body;
    let query = "delete from `diploma practice` where `diploma practice`.`ID` = ?";
    connection.query(query, [speciality.id], (err, result) => {
        if(!err) {
            return res.status(200).json({message : "Deleted Successfully"})
        } else {
            return res.status(500).json(err);
        }
    })
})


module.exports = router
