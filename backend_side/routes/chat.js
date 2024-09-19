const express = require('express');
const connection = require('../connection');
const router = express.Router();
require('dotenv').config();

// Authentification middleware
var auth = require('../services/authentification');
var checkRole = require('../services/checkRole');

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
                return res.status(500).json({ error: 'Failed to fetch messages' });
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
                return res.status(500).json({ error: 'Failed to send message' });
            }
            res.json({ message: 'Message sent successfully' });
        }
    );
});


module.exports = router;
