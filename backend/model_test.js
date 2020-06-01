var db=require('./model');
db.createClassroom('a');
db.createUser('a','staff','a');
db.createUser('b','student','a');
db.createOfficeHour('a','a',"10:00","10:00",1);
for (var i=1;i<8;i++){
    db.createOfficeHour('a','a',(9+i)+":00",(10+i)+":00",i);
}
db.createAppointment("b","2020-01-01",'b',1);

