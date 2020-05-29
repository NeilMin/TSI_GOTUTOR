var db=require('./model');
db.addClassroom('a')
db.addUser('a','staff','a');
db.addUser('b','student','a');
db.addOfficeHour('a','a',"10:00","10:00",1);
db.addOfficeHour('b','a',"10:00","10:00",1);
db.readEffectiveOfficeHour("a",null)
db.addAppointment("j","2020-01-01",'b',1)
db.addAppointment("j","2020-07-01",'b',3)
