var db=require('./model');
db.createClassroom('a')
db.createUser('a','staff','a');
db.createUser('b','student','a');
db.createOfficeHour('a','a',"10:00","10:00",1);
db.createOfficeHour('b','a',"10:00","10:00",1);
db.readEffectiveOfficeHour("a",null)
db.createAppointment("j","2020-01-01",'b',1)
db.createAppointment("j","2020-07-01",'b',3)
