// API для роботи з даними в таблиці User


const express = require('express')
const connection = require('../connection');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
require('dotenv').config();

//authentification
var auth = require('../services/authentification')
//checkRoles
var checkRole = require('../services/checkRole')
//MailSender
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD
  }
});

// секюрити (авторазицая, отправка пароля, обновление пароля, проверка наличия токена)
router.post('/login', (req,res) => {
  const user = req.body;
  query = "select login, password, user_type from user where login=?"
  connection.query(query, [user.email], (err, results) => {
    if(!err) {
      if(results.length <= 0 || results[0].password != user.password) {
        return res.status(401).json({message: "Incorrect Login or Password"});
      } else if (results[0].password == user.password) {
        const response = { login: results[0].login, user_type: results[0].user_type}
        const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {expiresIn: '8h'})
        res.status(200).json({token:accessToken});
      } else {
        return res.status(400).json({message: "Something went wrong. Please try again later"});
      }
    } else {
      return res.status(500).json(err);
    }
  })
})
router.post('/forgotPasssword', (req, res) => {
  const user = req.body;
  query = "select login, password from user where login = ?"
  connection.query(query, [user.email], (err, results) => {
    if(!err) {
      if(results.length <= 0) {
        return res.status(200).json({message: "Password sent successfully to your email."})
      } else {
        var mailOptions = {
          from: process.env.EMAIL_LOGIN,
          to: results[0].login,
          subject: 'Password by Diploma Practice',
          html: '<p><b>Your password is:' + results[0].password + '</b></p>'
        }
        transporter.sendMail(mailOptions, function (error, info) {
          if(error) {
            console.log(error)
          } else {
            console.log('Email sent: ' + info.response);
          }
        })
        return res.status(200).json({message: "Password sent successfully to your email."});
      }
    } else {
      return res.status(500).json(err);
    }
  })
})
router.get('/checkToken', auth.authenticateToken, (req,res) => {
  return res.status(200).json({message: "true"})
})

router.post('/changePassword', auth.authenticateToken, (req,res) => {
  const user = req.body;
  const login = res.locals.login;

  var query = "select login, password from user where login = ? and password = ?";
  connection.query(query, [user.login, user.oldPassword], (err, results) => {
    if(!err) {
      if(results.length <= 0) {
        return res.status(400).json({message: "Incorrect old Password"});
      } else if (results[0].password == user.oldPassword) {
        query = "update user set password =? where login = ?"
        connection.query(query, [user.newPassword, login], (err, response) => {
          if(!err){
            return res.status(200).json({message: "Password updated successfully."})
          } else {
            return res.status(500).json(err);
          }
        });
      } else {
        return res.status(400).json({message: "Something went wrong. Please try again later"})
      }
    } else {
      return res.status(500).json(err);
    }
  })
})


// вернуть всех юзеров
router.get('/get', auth.authenticateToken, checkRole.checkRoleAdmin, (req, res) => {
  var query = "select id, login, name, contact_number, user_type, password from user"
  connection.query(query, (err, results) => {
    if(!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  })
});

router.get('/getAdmins', auth.authenticateToken, checkRole.checkRoleAdmin, (req, res) => {
  var query = "select id, login as email, name, contact_number as contactNumber, user_type, password from user where user_type = '3'"
  connection.query(query, (err, results) => {
    if(!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  })
});

router.get('/getStudents', auth.authenticateToken, checkRole.checkRoleAdmin, (req, res) => {
  var query = "select id, login as email, name, contact_number as contactNumber, user_type, password from user where user_type = '1'"
  connection.query(query, (err, results) => {
    if(!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  })
});

router.get('/getTeachers', auth.authenticateToken, checkRole.checkRoleAdmin, (req, res) => {
  var query = "select id, login as email, name, contact_number as contactNumber, user_type, password from user where user_type = '2'"
  connection.query(query, (err, results) => {
    if(!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  })
});

// ДОДАВАНЯ РІЗНИХ ТИПІВ ЮЗЕРІВ В ТАБЛИЦЮ
router.post('/add', auth.authenticateToken, checkRole.checkRoleAdmin, (req,res) => {
  let user = req.body;
  console.log(user)
  query = "select login, password, user_type from user where login=?"
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if(results.length <= 0) {
        query = "INSERT INTO `user` (`Name`, `contact_number`, `user_type`, `login`, `password`) VALUES (?,?,?,?,?);"
        connection.query(query, [user.name, user.contactNumber, user.user_type, user.email, user.password], (err, results) => {
          if(!err) {
            console.log("Successfully Registered");
            return res.status(200).json({message: "Successfully Registered"});
          } else {
            console.log(err);
            return res.status(500).json(err);
          }
        })
      } else {
        console.log("Email Already Exist");
        return res.status(400).json({message: "Email Already Exist"});
      }
    } else {
      return res.status(500).json(err);
    }
  })
})

// update
router.patch('/update', auth.authenticateToken, checkRole.checkRoleAdmin, (req, res)=> {
  let user = req.body;
  console.log(user);
  query = "select * from user where `user`.`login` = ? AND `user`.`ID` != ?"
  connection.query(query, [user.email, user.id], (err, results) => {
    if (!err) {
      if(results.length <= 0) {
        let query = "UPDATE `user` SET `Name` = ?, `contact_number` = ?, `login` = ?, `password` = ? WHERE `user`.`ID` = ?"
        connection.query(query,[user.name, user.contactNumber, user.email, user.password, user.id], (err, result)=> {
          if(!err){
            if (result.afffectedRows == 0) {
              return res.status(404).json({message : "User ID does not found"});
            } else {
              return res.status(200).json({message : "User Updated Successfully"});
            }
          } else {
            return res.status(500).json(err);
          }
        })
      } else {
        return res.status(400).json({message: "User Already Exist"});
      }
    } else {
      return res.status(500).json(err);
    }
  })
})

router.post('/delete', auth.authenticateToken, checkRole.checkRoleAdmin, (req, res)=> {
  let user = req.body;
  let query = "delete from `user` where `user`.`ID` = ?";
  connection.query(query, [user.id], (err, result) => {
    if(!err) {
      return res.status(200).json({message : "User Deleted Successfully"})
    } else {
      return res.status(500).json(err);
    }
  })
})



// додавання студента
// router.post('/addStudent', auth.authenticateToken, checkRole.checkRoleAdmin, (req,res) => {
//   let user = req.body;
//   query = "select login, password, user_type from user where login=?"
//   connection.query(query, [user.email], (err, results) => {
//     if (!err) {
//       if(results.length <= 0) {
//         query = "INSERT INTO `user` (`Name`, `contact_number`, `user_type`, `login`, `password`) VALUES (?,?,'1',?,?);"
//         connection.query(query, [user.name, user.contact_number, user.user_type, user.email, user.password], (err, results) => {
//           if(!err) {
//             console.log("Successfully Registered");
//             return res.status(200).json({message: "Successfully Registered"});
//           } else {
//             return res.status(500).json(err);
//           }
//         })
//       } else {
//         console.log("Email Already Exist");
//         return res.status(400).json({message: "Email Already Exist"});
//       }
//     } else {
//       return res.status(500).json(err);
//     }
//   })
// })
// // додавання вчителя
// router.post('/addTeacher', auth.authenticateToken, checkRole.checkRoleAdmin, (req,res) => {
//   let user = req.body;
//   query = "select login, password, user_type from user where login=?"
//   connection.query(query, [user.email], (err, results) => {
//     if (!err) {
//       if(results.length <= 0) {
//         query = "INSERT INTO `user` (`Name`, `contact_number`, `user_type`, `login`, `password`) VALUES (?,?,'2',?,?);"
//         connection.query(query, [user.name, user.contact_number, user.user_type, user.email, user.password], (err, results) => {
//           if(!err) {
//             console.log("Successfully Registered");
//             return res.status(200).json({message: "Successfully Registered"});
//           } else {
//             return res.status(500).json(err);
//           }
//         })
//       } else {
//         console.log("Email Already Exist");
//         return res.status(400).json({message: "Email Already Exist"});
//       }
//     } else {
//       return res.status(500).json(err);
//     }
//   })
// })
// // додавання адміна
// router.post('/addAdmin', (req,res) => {
//   let user = req.body;
//   query = "select login, password, user_type from user where login=?"
//   connection.query(query, [user.email], (err, results) => {
//     if (!err) {
//       if(results.length <= 0) {
//         query = "INSERT INTO `user` (`Name`, `contact_number`, `user_type`, `login`, `password`) VALUES (?,?,'3',?,?);"
//         connection.query(query, [user.name, user.contactNumber, user.email, user.password], (err, results) => {
//           if(!err) {
//             console.log("Successfully Registered");
//             return res.status(200).json({message: "Successfully Registered"});
//           } else {
//             return res.status(500).json(err);
//           }
//         })
//       } else {
//         console.log("Email Already Exist");
//         return res.status(400).json({message: "Email Already Exist"});
//       }
//     } else {
//       return res.status(500).json(err);
//     }
//   })
// })





module.exports = router

