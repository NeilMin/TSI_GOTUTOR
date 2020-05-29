//Connect to database
const DB_NAME = "CSE110"
const mysqlx = require('@mysql/xdevapi');
const session = mysqlx.getSession({ user: "client", socket: "/var/run/mysqld/mysqlx.sock", schema: DB_NAME });
const db = session.then(s => { return s.getSchema(DB_NAME) });

module.exports.addClassroom = function (classroomId) {
  return db.then(db => {
    return db.getTable('classroom').insert("idclassroom").values(classroomId).execute();
  })
}

module.exports.readAllClassroom = function () {
  return db.then(db => {
    return db.getTable('classroom').select('idclassroom').execute();
  }).then(result => { return result.fetchAll()[0]; });
}

module.exports.addUser = function (user, role, classroom) {
  return db.then(db => { db.getTable('user').insert('iduser', 'user_type', 'classroom_idclassroom').values(user, role, classroom).execute(); });
}

module.exports.readUserByClassroom = function (classroom) {
  return db.then(db => { return db.getTable('user').select('iduser', 'user_type').where('classroom_idclassroom=:cid').bind('cid', classroom).execute() }).then(r => (r.fetchAll().map(x => { return ({ userId: x[0], role: x[1] }) })))
}

module.exports.readClassroomByUser = function (user) {
  return db.then(db => { return db.getTable('user').select('classroom_idclassroom', 'user_type').where('iduser=:uid').bind('uid', user).execute() }).then(r => (r.fetchAll().map(x => { return ({ classroomId: x[0], role: x[1] }) })))
}
module.exports.addOfficeHour = function (tutorId, classroom, time_start, time_end, day_of_week) {
  return db.then(db => { return db.getTable('user').select('classroom_idclassroom', 'user_type').where('iduser=:uid AND classroom_idclassroom=:cid AND user_type=:role').bind('uid', tutorId).bind('cid', classroom).bind('role', 'staff').execute() }).then(s => {
    if (s.fetchAll().length === 0) {
      return Promise.reject("Not a Tutor ID");
    }
    return db.then(db=>{return db.getTable('officeHour').select('idofficeHour')
    .where('time_start=:ti AND time_end=:te AND day_of_week=:dw AND user_iduser=:uid AND classroom_idclassroom=:cid AND `in effect`=1').bind('ti',time_start)
    .bind('te',time_end)
    .bind('dw',day_of_week)
    .bind('uid',tutorId)
    .bind('cid',classroom).execute()});})
    .then(r=>{
      var result=r.fetchAll();
      console.log(result);
      if (result.length!==0) {
        return Promise.reject("already exist"+result[0][0]);
      }
      
      return db.then(db => {
        console.log(db);
        return db.getTable('officeHour').insert('time_start', 'time_end', 'day_of_week', 'user_iduser', 'classroom_idclassroom').values([time_start, time_end, day_of_week, tutorId, classroom]).execute();
      })
      
    })
    
  
}

module.exports.deleteOfficeHourById = function (officeHourId) {
  return db.then(db => { return db.getTable('officeHour').update().where('`idofficeHour`==:oid').bind('oid', officeHourId).set('`in effect`', 0).execute() })
}

module.exports.readEffectiveOfficeHour = function (classroom, tutorId) {
  return db.then(db => {
    var query = db.getTable('officeHour').select('time_start', 'time_end', 'day_of_week', 'user_iduser', 'idofficeHour').where('classroom_idclassroom==:cid AND `in effect`==1').bind('cid', classroom)
    if (tutorId != null) {
      query = query.where('user_iduser=:uid').bind('uid', tutorId);
    }
    return query.execute()
  }).then(r => (
    r.fetchAll().map(x => ({
      time_start: x[0],
      time_end: x[1],
      day_of_week: x[2],
      user_iduser: x[3],
      id: x[4]
    }))
  )
  )
}

module.exports.addAppointment = function (description, date, studentId, officeHourId) {
  return db.then(db => {
    return db.getTable('appointment').insert(['description', 'date', 'user_iduser', 'officeHour_idofficeHour']).values([description, date, studentId, officeHourId]).execute();
  })
}
