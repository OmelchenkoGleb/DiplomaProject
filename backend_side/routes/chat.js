const express = require('express');
const connection = require('../connection');
const router = express.Router();
const nodemailer = require('nodemailer')
require('dotenv').config();

// Authentification middleware
var auth = require('../services/authentification');
var checkRole = require('../services/checkRole');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_LOGIN,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Получение всех сообщений по chat_id
router.post('/messagesFromChat', auth.authenticateToken, (req, res) => {
    const practice_id = req.body.practice_id;
    connection.query(
        //'SELECT ms.`id` as id, ms.`sender_id` as `sender_id`, ms.`content` as `content`, ms.`created_at` as `created_at`, ms.`conversation_id` as `conversation_id`, us.`login` as email FROM messages ms INNER JOIN `user` us ON (us.`ID` = ms.`sender_id`) WHERE conversation_id = (SELECT cv.`id` FROM `conversations` cv INNER JOIN `user` us ON (us.`ID` = cv.`user_one_id`) INNER JOIN `user` uss ON (uss.`ID` = cv.`user_two_id`) WHERE us.`login` = ? OR uss.`login` = ?) ORDER BY created_at ASC',
        'SELECT ms.`id` as id, ms.`sender_id` as `sender_id`, ms.`content` as `content`, ms.`created_at` as `created_at`, ms.`conversation_id` as `conversation_id`, us.`login` as email FROM messages ms INNER JOIN `user` us ON (us.`ID` = ms.`sender_id`) WHERE conversation_id = ( SELECT cv.`id` FROM `conversations` cv WHERE cv.`diploma_practice_id` = ? ) ORDER BY created_at ASC',
        [practice_id],
        (err, results) => {
            if (err) {
                console.error('Error fetching messages:', err);
                return res.status(500).json({ error: 'Помилка отримання повідомлень' });
            }
            res.json(results);
        }
    );
});

// Добавление нового сообщения
router.post('/sendmessage', auth.authenticateToken, (req, res) => {
    const { practice_id, senderLogin, content } = req.body;
    connection.query(
        'INSERT INTO messages (conversation_id, sender_id, content) VALUES ( (SELECT `id` FROM `conversations` WHERE `diploma_practice_id` = ?) , (SELECT `ID` from `user` WHERE `login` = ?), ?)',
        [practice_id, senderLogin, content],
        (err, result) => {
            if (err) {
                console.error('Error sending message:', err);
                return res.status(500).json({ error: 'Помилка під час відправки повідомлення' });
            }
            else {
                var query = "SELECT uss.`login` as teacher_login, us.`login` as student_login FROM `diploma practice` dp INNER JOIN `user` us ON (us.`ID` = dp.`student_id`) INNER JOIN `directionofthesis` dr ON (dr.`ID` = dp.`directionofthesis_id`) INNER JOIN `specialty` sp ON (sp.`ID` = dr.`group_id`) INNER JOIN `user` uss ON (uss.`ID` = dr.`teacher_id`)";
                connection.query(query, (err, result)=> {
                    if(!err){
                        var from;
                        var to;
                        if (result[0].teacher_login == senderLogin) {
                            from = result[0].teacher_login;
                            to = result[0].student_login;
                        } else {
                            from = result[0].student_login;
                            to = result[0].teacher_login;
                        }
                        var mailOptions = {
                            from: process.env.EMAIL_LOGIN,
                            to: to,
                            subject: 'Вам надіслали повідомленя з "Система Керування Дипломною Практикою"',
                            html: '<p><b>'+ from + ': ' +content+'</b></p>'
                        }
                        transporter.sendMail(mailOptions, function (error, info) {
                            if(error) {
                                console.log(error)
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        })
                        res.json({ message: 'Повідомлення надіслано успішно!' });
                    } else {
                        return res.status(500).json(err);
                    }
                })
            }
        }
    );
});

router.post('/sendMessageToAdmins', auth.authenticateToken, (req, res) => {
    const { content, teacherLogin} = req.body;
    var mailOptions = {
        from: teacherLogin,
        to: process.env.EMAIL_LOGIN,
        subject: 'Питання від викладача!',
        html: '<p><b>'+content+'</b></p>'
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if(error) {
            console.log(error)
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
    return res.json({ message: 'Повідомлення надіслано успішно!' });
});

router.post('/sendMessageFromAdmins', auth.authenticateToken, (req, res) => {
    const { content, email} = req.body;
    var mailOptions = {
        from: process.env.EMAIL_LOGIN,
        to: email,
        subject: 'Вам надіслано повідомлення від "Система Управління Дипломною Практикою"!',
        html: '<p><b>'+content+'</b></p>'
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if(error) {
            console.log(error)
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
    return res.json({ message: 'Повідомлення надіслано успішно!' });
});


module.exports = router;
