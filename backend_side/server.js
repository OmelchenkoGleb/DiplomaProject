// require('dotenv').config();
// const http= require('http');
// const app = require('./index');
// const server = http.createServer()
// server.listen((process.env.PORT), (process.env.HOST), () => {
// });
//
//


require('dotenv').config();
const http = require('http');
const app = require('./index');
const socketIO = require('socket.io');

const server = http.createServer(app);

// // Создаем инстанс Socket.IO
// const io = socketIO(server, {
//     cors: {
//         origin: 'http://localhost:4200',
//         methods: ['GET', 'POST'],
//         credentials: true
//     }
// });
//
// // Массив для хранения подключений пользователей
// let users = [];
//
// // Подключаем Socket.IO
// io.on('connection', (socket) => {
//     console.log('New user connected');
//
//     // Добавляем пользователя в массив
//     socket.on('joinChat', (userId) => {
//         users.push({ userId, socketId: socket.id });
//         console.log(`User ${userId} connected`);
//     });
//
//     // Обрабатываем событие отправки сообщения
//     socket.on('sendMessage', (messageData) => {
//         const { senderId, receiverId, content } = messageData;
//
//         // Находим получателя по userId
//         const receiver = users.find(user => user.userId === receiverId);
//
//         if (receiver) {
//             // Отправляем сообщение получателю
//             io.to(receiver.socketId).emit('receiveMessage', {
//                 senderId,
//                 content,
//                 timestamp: new Date()
//             });
//         }
//     });
//
//     // Убираем пользователя при отключении
//     socket.on('disconnect', () => {
//         users = users.filter(user => user.socketId !== socket.id);
//         console.log('User disconnected');
//     });
// });

server.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Server running on http://${process.env.HOST}:${process.env.PORT}`);
});

