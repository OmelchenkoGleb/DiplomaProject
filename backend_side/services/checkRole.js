require('dotenv').config()

function checkRoleAdmin(req, res, next) {
  if (res.locals.user_type == process.env.STUDENT || res.locals.user_type == process.env.TEACHER) res.sendStatus(401)
  else next()
}
function checkRoleStudent(req, res, next) {
  if (res.locals.user_type == process.env.ADMIN || res.locals.user_type == process.env.TEACHER) res.sendStatus(401)
  else next()
}
function checkRoleTeacher(req, res, next) {
  if (res.locals.user_type == process.env.SRUDENT || res.locals.user_type == process.env.ADMIN) res.sendStatus(401)
  else next()
}

module.exports = {
  checkRoleAdmin: checkRoleAdmin,
  checkRoleStudent: checkRoleStudent,
  checkRoleTeacher: checkRoleTeacher
}
