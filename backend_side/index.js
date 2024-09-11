const express = require('express');
var cors = require('cors');

const connection = require('./connection')
const userRoute = require('./routes/user');
const specialityRoute = require('./routes/speciality');
const directionofthesisRoute = require('./routes/directionofthesis');
const dashboardRoute = require('./routes/dashboard');
const diploma_practiceRoute = require('./routes/diploma_practice');

const app = express();
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use('/user', userRoute);
app.use('/speciality', specialityRoute);
app.use('/directionofthesis', directionofthesisRoute);
app.use('/dashboard', dashboardRoute);
app.use('/diploma_practice', diploma_practiceRoute);


app.listen(process.env.PORT, () => {
  console.log(`Сервер запущен на: http://${process.env.HOST}:${process.env.PORT}`)
})


module.exports = app;
