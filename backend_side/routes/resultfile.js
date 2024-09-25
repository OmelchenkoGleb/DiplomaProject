// API для роботи із таблицею faculty

const express = require('express')
const connection = require('../connection');
const multer = require('multer');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

//authentification
var auth = require('../services/authentification')
//checkRoles
var checkRole = require('../services/checkRole')

// БАЗОВІ CRUD ЗАПИТИ
// get
router.post('/getReport', auth.authenticateToken, (req, res)=> {
    let resultfile = req.body;
    let query = "SELECT rf.`ID` as `ID`, rf.`filetype_id` as `filetype_id`, rf.`file` as `file`, rf.`filename` as `filename` FROM `resultfile` rf INNER JOIN `user` us ON(us.`ID` = rf.`user_id`) WHERE us.`login` = ? AND rf.`filetype_id` = '2'"
    connection.query(query,[resultfile.login], (err, result)=> {
        if(!err){
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })
})


router.post('/getAdminsFile', auth.authenticateToken, (req, res)=> {
    let resultfile = req.body;
    let query = "SELECT * FROM `resultfile` WHERE `filetype_id` = 3"
    connection.query(query,[resultfile.login], (err, result)=> {
        if(!err){
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })
})

// delete
router.post('/delete', auth.authenticateToken, (req, res)=> {
    let speciality = req.body;
    let query = "delete from `resultfile` where `resultfile`.`ID` = ?";
    connection.query(query, [speciality.id], (err, result) => {
        if(!err) {
            return res.status(200).json({message : "Успішно!"})
        } else {
            return res.status(500).json(err);
        }
    })
})

router.post('/getDiary', auth.authenticateToken, (req, res)=> {
    let resultfile = req.body;
    let query = "SELECT rf.`ID` as `ID`, rf.`filetype_id` as `filetype_id`, rf.`file` as `file`, rf.`filename` as `filename` FROM `resultfile` rf INNER JOIN `user` us ON(us.`ID` = rf.`user_id`) WHERE us.`login` = ? AND rf.`filetype_id` = '1'"
    connection.query(query,[resultfile.login], (err, result)=> {
        if(!err){
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })
})

// Ендпоінт для отримання файлу за ID
router.get('/getFile/:id', auth.authenticateToken, (req, res)=> {
    const fileId = req.params.id;
    let query = "SELECT `filename`, `file` FROM `resultfile` WHERE `ID` = ?"
    connection.query(query, [fileId], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Помилка');
        } else {
            if (result.length > 0) {
                const file = result[0];
                const fileName = encodeURIComponent(file.filename);
                res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${fileName}`);
                //res.setHeader('Content-Disposition', `attachment; filename=${file.filename}`);
                res.setHeader('Content-Type', 'application/octet-stream');
                res.send(file.file); // Відправляємо BLOB дані
            } else {
                res.status(404).send('Не знайдено файлу');
            }
        }
    });
});




// Налаштування multer для завантаження файлів
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Ліміт на розмір 10MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Не правильний тип файлу - лише ворд!'));
        }
    }
});

// Ендпоінт для завантаження файлу
router.post('/uploadDoc', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Не завантажено файл.');
    }
    const login = req.body.login;
    const filetype = req.body.filetype;
    const filename = req.body.filename;
    // const fileName = req.file.originalname;
    const fileData = req.file.buffer; // Отримуємо файл як буфер для зберігання в БД
    const query = 'INSERT INTO `resultfile` (`filetype_id`, `user_id`, `file`, `filename`) VALUES (? , (SELECT `ID` FROM `user` WHERE `login` = ?), ?, ?)'
    connection.query(query, [filetype, login, fileData, filename], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        } else {
            return res.status(200).json({message: "Успішно!."});
        }
    });
});





module.exports = router
