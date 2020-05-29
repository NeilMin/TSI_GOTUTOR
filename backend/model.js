//Connect to database
const DB_NAME = "CSE110"
const mysqlx = require('@mysql/xdevapi');
const session = mysqlx.getSession({ user: "client", socket: "/var/run/mysqld/mysqlx.sock", schema: DB_NAME });
const db = session.then(s => { return s.getSchema(DB_NAME) });

module.exports.createClassroom = function (classroomId) {
  return db.then(db => {
    return db.getTable('classroom').insert("idclassroom").values(classroomId).execute();
  })
}

module.exports.readAllClassroom = function () {
  return db.then(db => {
    return db.getTable('classroom').select('idclassroom').execute();
  }).then(result => { return result.fetchAll()[0]; });
}

module.exports.createUser = function (user, role, classroom) {
  return db.then(db => { db.getTable('user').insert('iduser', 'user_type', 'classroom_idclassroom').values(user, role, classroom).execute(); });
}

module.exports.readUserByClassroom = function (classroom) {
  return db.then(db => { return db.getTable('user').select('iduser', 'user_type').where('classroom_idclassroom=:cid').bind('cid', classroom).execute() }).then(r => (r.fetchAll().map(x => { return ({ userId: x[0], role: x[1] }) })))
}

module.exports.readClassroomByUser = function (user) {
  return db.then(db => { return db.getTable('user').select('classroom_idclassroom', 'user_type').where('iduser=:uid').bind('uid', user).execute() }).then(r => (r.fetchAll().map(x => { return ({ classroomId: x[0], role: x[1] }) })))
}
module.exports.createOfficeHour = function (tutorId, classroom, time_start, time_end, day_of_week) {
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

function filter(query,classroom,userId,base) {
  var whereStr=base?base:"";
  if (classroom) {
    whereStr+=" AND classroom_idclassroom==:cid";
  }
  if (userId) {
    whereStr+=" AND user_iduser=:uid"
  }
  if (whereStr.startsWith(" AND")){
    whereStr=whereStr.substring(4);
  }
  query=query.where(whereStr)
  if (classroom) {
    query=query.bind('cid',classroom);
  }
  if (userId) {
    query=query.bind('uid',userId);
  }
  return query;
}

function readOfficeHour(table,classroom, tutorId) {
  return db.then(db => {
    var query = db.getTable(table).select('time_start', 'time_end', 'day_of_week', 'user_iduser', 'idofficeHour')
    return filter(query,classroom,tutorId,null).execute()
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

module.exports.readUnavailableOfficeHour= function (classroom, tutorId){
  readOfficeHour('unavailableOfficeHour',classroom, tutorId)
}

module.exports.readAvailableOfficeHour= function (classroom, tutorId){
  readOfficeHour('availableOfficeHour',classroom, tutorId)
}

module.exports.createAppointment = function (description, date, studentId, officeHourId) {
  return db.then(db => {
    return db.getTable('appointment').insert(['description', 'date', 'user_iduser', 'officeHour_idofficeHour']).values([description, date, studentId, officeHourId]).execute();
  })
}

module.exports.deleteAppointmentById=function (id) {
  return db.then(db=>(db.getTable('appointment').delete().where('id=:id').bind('id',id).execute()))
}

module.exports.updateAppointmentById=function(id,status,description){
  return db.then(db => { 
    var query=db.getTable('appointment').update().where('`idappointment`==id').bind('id', id);
    if (description!=null) {
      query.set('description',description);
    }
    if (status!=null){
      query.set('status',status);
    }
    query.execute() })
  
}
module.exports.readAppointmentByStudentId=function (classroom,user,role) {
  return db.then(db=>{
    var query=db.getTable('futureAppointment').select();
    if (role==='student') {
      query.where('studentId=:id AND classroomId=:cid')
    }else{
      query.where('tutorId=:id AND classroomId=:cid')
    }
    return query.bind('id',user).bind('cid',classroom).execute()
  }).then(r=>(r.fetchAll().map(e=>({
    id:e[0],
    description:e[1],
    date:e[2],
    studentId:e[3],
    officeHourId:e[4],
    time_start:e[5],
    time_end:e[6],
    classroomId:e[7],
    tutorId:e[8]
  }))))
}

module.exports.createForumThread=function (title,paragraph,userId,classroomId) {
  db.then(db=>{db.getTable('forumThread').insert('title','paragraph','user_iduser','classroom_idclassroom').values(title,paragraph,userId,classroomId).execute()})
}

module.exports.updateForumThread=function (title,paragraph,userId,classroomId) {
  db.then(db=>{db.getTable('forumThread').insert('title','paragraph','user_iduser','classroom_idclassroom').values(title,paragraph,userId,classroomId).execute()})
}

module.exports.readForumThread=function(classroom, userId) {
  return db.then(db => {
    var query = db.getTable('forumThread').select('title','paragraph','user_iduser','idforumThread');
    return filter(query,classroom,userId).execute()
  }).then(r => (
    r.fetchAll().map(x => ({
      title: x[0],
      paragraph: x[1],
      userId: x[2],
      id: x[4]
    }))
  )
  )
}

module.exports.deleteForumThreadById=function(id){
  return db.then(db=>(db.getTable('forumHead').delete().where('`idforumThread`=:fid').bind('fid',id).execute()))
}

module.exports.createForumReply=function (reply,thread,user) {
  return db.then(db=>(db.getTable('forumReply').insert('reply','forumThread_idforumThread','user_iduser').values(reply,thread,user).execute()));
}

module.exports.createForumReply=function (reply,thread,user) {
  return db.then(db=>(db.getTable('forumReply').insert('reply','forumThread_idforumThread','user_iduser').values(reply,thread,user).execute()));
}

module.exports.createTicket=function (description,time_posted,studentId,classroom) {
  return db.then(db=>(db.getTable('tickets').insert('description','time_posted','studentId','user_classroom_idclassroom1').values(description,time_posted,studentId,classroom).execute()))
}

module.exports.updateTicket=function (ticketId,changes) {
  return db.then(db=>{
    var query=db.getTable('tickets').update().where('idtickets=:tid').bind('tid',ticketId);
    ['description','response','time_resolved','feedback_style','status','textual_feedback','tutorId'].forEach(e => {
      if(changes[e]){
        query=query.set(e,changes[e]);
      }
    });
  })
}