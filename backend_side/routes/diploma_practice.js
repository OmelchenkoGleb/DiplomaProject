// API для роботи із таблицею faculty

const express = require('express')
const connection = require('../connection');
const router = express.Router();
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');
require('dotenv').config();

//authentification
var auth = require('../services/authentification')
//checkRoles
var checkRole = require('../services/checkRole')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_LOGIN,
        pass: process.env.EMAIL_PASSWORD
    }
});

// БАЗОВІ CRUD ЗАПИТИ
// get
router.post('/get', auth.authenticateToken, checkRole.checkRoleTeacher, (req, res)=> {
    let informationTeacher = req.body;
    let query = "SELECT dr.`ID` as directionId, dp.`ID` as ID, dp.`description` as description, dr.`name` as directionofthesis_name, sp.`Name` as group_name, dp.`student_id` as student_id FROM `diploma practice` dp INNER JOIN `directionofthesis` dr ON (dr.`ID` = dp.`directionofthesis_id`) INNER JOIN `specialty` sp ON (sp.`ID` = dr.`group_id`) INNER JOIN `user` uss ON (uss.`ID` = dr.`teacher_id`) WHERE uss.`login` = ? AND dp.`student_id` IS NULL";
    connection.query(query,[informationTeacher.login], (err, result)=> {
        if(!err){
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.post('/getForTeacher', auth.authenticateToken, checkRole.checkRoleTeacher, (req, res)=> {
    let informationTeacher = req.body;
    let query = "SELECT dp.`ID` as practice_id, dp.`description` as description, us.`Name` as student_name, us.`contact_number` as contact_number, us.`login` as student_email, dr.`name` as directionofthesis_name, sp.`Name` as group_name FROM `diploma practice` dp INNER JOIN `user` us ON (us.`ID` = dp.`student_id`) INNER JOIN `directionofthesis` dr ON (dr.`ID` = dp.`directionofthesis_id`) INNER JOIN `specialty` sp ON (sp.`ID` = dr.`group_id`) INNER JOIN `user` uss ON (uss.`ID` = dr.`teacher_id`) WHERE uss.`login` = ?";
    connection.query(query,[informationTeacher.login], (err, result)=> {
        if(!err){
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.post('/getForStudent', auth.authenticateToken, checkRole.checkRoleStudent, (req, res)=> {
    let informationStudent = req.body;
    let query = "SELECT uss.`login` as teacher_login, dr.`ID` as directionId, dp.`ID` as ID, dp.`description` as description, dr.`name` as directionofthesis_name, sp.`Name` as group_name, uss.`name` as teacher_name FROM `diploma practice` dp INNER JOIN `directionofthesis` dr ON (dr.`ID` = dp.`directionofthesis_id`) INNER JOIN `specialty` sp ON (sp.`ID` = dr.`group_id`) INNER JOIN `user` uss ON (uss.`ID` = dr.`teacher_id`) WHERE dp.`student_id` is NULL AND dr.`group_id` = ( SELECT gm.`specialty_id` FROM `group_member`gm INNER JOIN `user` us ON (gm.`student_id` = us.`ID`) WHERE us.`login` = ?)";
    connection.query(query,[informationStudent.login], (err, result)=> {
        if(!err){
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.post('/checkPracticeForStudent', auth.authenticateToken, checkRole.checkRoleStudent, (req, res)=> {
    let informationStudent = req.body;
    let query = "SELECT uss.`login` as teacher_email, dr.`ID` as directionId, dp.`ID` as ID, dp.`description` as description, dr.`name` as directionofthesis_name, sp.`Name` as group_name, uss.`name` as teacher_name FROM `diploma practice` dp INNER JOIN `directionofthesis` dr ON (dr.`ID` = dp.`directionofthesis_id`) INNER JOIN `specialty` sp ON (sp.`ID` = dr.`group_id`) INNER JOIN `user` uss ON (uss.`ID` = dr.`teacher_id`) WHERE dp.`student_id` = (SELECT `ID` FROM `user` WHERE `login` = ?)";
    connection.query(query,[informationStudent.login], (err, result)=> {
        if(!err){
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.post('/setNullForTeacher', auth.authenticateToken, checkRole.checkRoleTeacher, (req,res) => {
    let diplomapractice = req.body;
    console.log(diplomapractice);
    query = "UPDATE `diploma practice` SET `student_id` = NULL WHERE `diploma practice`.`ID` = ?"
    connection.query(query, [diplomapractice.id], (err, results) => {
        if(!err) {
            query = "DELETE FROM `conversations` WHERE `conversations`.`diploma_practice_id` = ?"
            connection.query(query, [diplomapractice.id], (err, results) => {
                if(!err) {
                    query = "DELETE FROM `tasks` WHERE `tasks`.`diplomapractice_id` = ?"
                    connection.query(query, [diplomapractice.id], (err, results) => {
                        if(!err) {
                            var mailOptions = {
                                from: process.env.EMAIL_LOGIN,
                                to: diplomapractice.student_email,
                                subject: 'Вам надіслали повідомленя з "Система Керування Дипломною Практикою"',
                                html: '<p><b>Викладач припинив за вами співпрацю. Будь ласка, оберіть собі нову тему!</b></p>'
                            }
                            transporter.sendMail(mailOptions, function (error, info) {
                                if(error) {
                                    console.log(error)
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            })
                            return res.status(200).json({message: "Successfully Remove Student"});
                        } else {
                            return res.status(500).json(err);
                        }
                    })
                } else {
                    return res.status(500).json(err);
                }
            })
        } else {
            return res.status(500).json(err);
        }
    })
})

router.post('/setStudent', auth.authenticateToken, checkRole.checkRoleStudent, (req,res) => {
    let diplomapractice = req.body;
    console.log(diplomapractice);
    query = "UPDATE `diploma practice` SET `student_id` = (SELECT `ID` FROM `user` WHERE `login` = ?) WHERE `diploma practice`.`ID` = ?"
    connection.query(query, [diplomapractice.student_email, diplomapractice.id], (err, results) => {
        if(!err) {
            query = "INSERT INTO `conversations` (`id`, `created_at`, `diploma_practice_id`) VALUES (NULL, current_timestamp(), ?);"
            connection.query(query, [diplomapractice.id], (err, results) => {
                if(!err) {
                    var mailOptions = {
                        from: process.env.EMAIL_LOGIN,
                        to: diplomapractice.teacher_login,
                        subject: 'Вам надіслали повідомленя з "Система Керування Дипломною Практикою"',
                        html: '<p><b>Cтудент `'+diplomapractice.student_email+'` обрав вашу тему - '+diplomapractice.theme+'  </b></p>'
                    }
                    transporter.sendMail(mailOptions, function (error, info) {
                        if(error) {
                            console.log(error)
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    })
                    query = "DELETE from `topic_proposal` WHERE `student_id` = (SELECT `ID` FROM `user` WHERE `login` = ?)";
                    connection.query(query, [diplomapractice.student_email], (err, results) => {
                        if(!err) {
                            return res.status(200).json({message: "Successfully Added New Practice"});
                        } else {
                            return res.status(500).json(err);
                        }
                    })
                } else {
                    return res.status(500).json(err);
                }
            })
        } else {
            return res.status(500).json(err);
        }
    })
})


// add
router.post('/add', auth.authenticateToken, checkRole.checkRoleTeacher, (req,res) => {
    let diplomapractice = req.body;
    console.log(diplomapractice);
    query = "INSERT INTO `diploma practice` (`ID`, `directionofthesis_id`, `description`) VALUES (NULL, ?, ?);"
    connection.query(query, [diplomapractice.directionofthesis_id, diplomapractice.description], (err, results) => {
        if(!err) {
            return res.status(200).json({message: "Successfully Added New Practice"});
        } else {
            return res.status(500).json(err);
        }
    })
})

// update
router.patch('/update', auth.authenticateToken, checkRole.checkRoleTeacher, (req, res)=> {
    let diplomapractice = req.body;
    let query = "UPDATE `diploma practice` SET `directionofthesis_id` = ?, `description` = ? WHERE `diploma practice`.`ID` = ?"
    connection.query(query,[diplomapractice.directionofthesis_id, diplomapractice.description, diplomapractice.id], (err, result)=> {
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
})
// delete
router.post('/delete', auth.authenticateToken, checkRole.checkRoleTeacher, (req, res)=> {
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






//TOPIC PROPOSAL

router.post('/getTopicProposal', auth.authenticateToken, checkRole.checkRoleTeacher, (req, res)=> {
    let informationTeacher = req.body;
    query = "SELECT dr.`ID` as direction_id, us.`ID` as student_id, uss.`name` as teacher_name, dp.`ID` as practice_id, dp.`description` as description, us.`Name` as student_name, us.`contact_number` as contact_number, us.`login` as student_email, dr.`name` as directionofthesis_name, sp.`Name` as group_name FROM `topic_proposal` dp INNER JOIN `user` us ON (us.`ID` = dp.`student_id`) INNER JOIN `directionofthesis` dr ON (dr.`ID` = dp.`directionofthesis_id`) INNER JOIN `specialty` sp ON (sp.`ID` = dr.`group_id`) INNER JOIN `user` uss ON (uss.`ID` = dr.`teacher_id`) WHERE uss.`login` = ?"
    connection.query(query,[informationTeacher.login], (err, result)=> {
        if(!err){
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.post('/setTopicProposal', auth.authenticateToken, checkRole.checkRoleStudent, (req,res) => {
    let diplomapractice = req.body;
    console.log(diplomapractice);
    query = "INSERT INTO `topic_proposal` (`ID`, `directionofthesis_id`, `description`, `student_id`) VALUES (NULL, ?, ?, (SELECT `ID` from `user` where `login` = ?));"
    connection.query(query, [diplomapractice.direction_id, diplomapractice.description, diplomapractice.student_login], (err, results) => {
        if(!err) {
            return res.status(200).json({message: "Successfully Added New Practice"});
        } else {
            return res.status(500).json(err);
        }
    })
})

router.post('/deleteTopicProposole', auth.authenticateToken, checkRole.checkRoleTeacher, (req,res) => {
    let diplomapractice = req.body;
    console.log(diplomapractice);
    query = "delete from `topic_proposal` where `ID` = ?"
    connection.query(query, [diplomapractice.id], (err, results) => {
        if(!err) {
            var mailOptions = {
                from: process.env.EMAIL_LOGIN,
                to: diplomapractice.student_email,
                subject: 'Вам надіслали повідомленя з "Система Керування Дипломною Практикою"',
                html: '<p><b>Викладач `'+diplomapractice.teacher_name+'` Відмовив Вам тему - '+diplomapractice.description+'. За таким напрямком - '+diplomapractice.directionofthesis_name+'  </b></p>'
            }
            transporter.sendMail(mailOptions, function (error, info) {
                if(error) {
                    console.log(error)
                } else {
                    console.log('Email sent: ' + info.response);
                }
            })
            return res.status(200).json({message: "Successfully Added New Practice"});
        } else {
            console.log(err)
            return res.status(500).json(err);
        }
    })
})

router.post('/approveTopicProposole', auth.authenticateToken, checkRole.checkRoleTeacher, (req,res) => {
    let diplomapractice = req.body;
    console.log(diplomapractice);

    query = "INSERT INTO `diploma practice` (`ID`, `directionofthesis_id`, `description`, `student_id`) VALUES (NULL, ?, ?, ?);"
    connection.query(query, [diplomapractice.direction_id, diplomapractice.description, diplomapractice.student_id], (err, results) => {
        if(!err) {
            query = "INSERT INTO `conversations` (`id`, `created_at`, `diploma_practice_id`) VALUES (NULL, current_timestamp(), ?);"
            connection.query(query, [results.insertId], (err, results) => {
                if(!err) {
                    var mailOptions = {
                        from: process.env.EMAIL_LOGIN,
                        to: diplomapractice.student_email,
                        subject: 'Вам надіслали повідомленя з "Система Керування Дипломною Практикою"',
                        html: '<p><b>Викладач `'+diplomapractice.teacher_name+'` Підтвердив Вам тему - '+diplomapractice.description+'. За таким напрямком - '+diplomapractice.directionofthesis_name+'  </b></p>'
                    }
                    transporter.sendMail(mailOptions, function (error, info) {
                        if(error) {
                            console.log(error)
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    })
                    query = "DELETE from `topic_proposal` WHERE `student_id` = (SELECT `ID` FROM `user` WHERE `login` = ?)";
                    connection.query(query, [diplomapractice.student_email], (err, results) => {
                        if(!err) {
                            return res.status(200).json({message: "Successfully Added New Practice"});
                        } else {
                            return res.status(500).json(err);
                        }
                    })
                } else {
                    return res.status(500).json(err);
                }
            })
        } else {
            return res.status(500).json(err);
        }
    })
})

module.exports = router
