process.env.DEBUG="cookie-session";

const login = require('./Login.js');
const DUMMY_CLASSROOM="a";
// Cookie
const cookieSession = require('cookie-session');

// Express
const express = require('express');
const app = express();

// HTTP
const http = require('http');
const httpServer = http.createServer(app);

// Multer
const multer = require('multer');

// SIO
const sio = require("socket.io")(httpServer);

//Database
const model=require('./model');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'GOTUTOR_UI/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname);
    }
});

const upload = multer({storage: storage});

const cookieSessionMiddleware = cookieSession({
    name: 's',
    secret: 'devel'
});

sio.use(function (socket, next) {
    //console.log(socket.request);
    cookieSessionMiddleware(socket.request, socket.request.res || {}, next);
});

sio.of('/appointments').on("connection", function (socket) {
    socket.on("reserve", (data) => {
        console.log(data);
        model.createAppointment(data.question,data.date,socket.request.session.uid,data.id)
        console.log("from " + socket.request.session.uid);
        socket.broadcast.emit('new', data.id);
    })
});

sio.of('/forumThread').on('connection',function (socket) {
    model.readForumThread(DUMMY_CLASSROOM,null).then(
        x=>{console.log(JSON.stringify(x));socket.emit("oldThread",x)}
    );
    socket.on("newThread",(data)=>{
        data.userId=socket.request.session.uid;
        model.createForumThread(data.title,data.body,data.userId,DUMMY_CLASSROOM).then(r=>{
            data.id=r.getAutoIncrementValue();
            sio.of('/forumThread').emit("otherThread",data);
            console.log(data);
        });
    })
});

sio.of('/forumReply').on('connection',function (socket) {
    socket.on('fetch',(s,fn)=>{
        socket.join(String(s));
        model.readForumRepliesByThreadId(s).then(r=>{
            console.log(r);
            fn(r)
        });
    });
    socket.on('newReply',(s)=>{
        s.userId=socket.request.session.uid;
        console.log(s);
        model.createForumReply(s.reply,s.threadId,s.userId).then(r=>{
            s.id=r.getAutoIncrementValue();
            console.log(s);
            sio.of('/forumReply').to(String(s.threadId)).emit('otherReply',s)
        })
    })
});

app.use('/', express.static('GOTUTOR_UI'));

app.use(cookieSessionMiddleware);

app.use(function (req, res, next) {
    console.log(req.path + " requested");
    console.log("user id is: " + req.session.uid);
    next();
});



app.get('/fetchAppointments', function (req, res) {
    console.log(req.session.uid);
    var queries=[
        model.readAvailableOfficeHour(DUMMY_CLASSROOM,null),
        model.readUnavailableOfficeHour(DUMMY_CLASSROOM,null),
        model.readAppointmentByStudentId(DUMMY_CLASSROOM,req.session.uid)
    ];
    Promise.all(queries).then(function(values){
        res.send(JSON.stringify({
            available:values[0],
            unavailable:values[1],
            myAppointments:values[2]
        }))
    })
});

app.post('/googleAuth', login);

app.get('/testUser', function (req, res) {
    req.session.uid = req.query.user;
    model.createUser(req.query.user,'student',DUMMY_CLASSROOM).catch(e=>{console.log('already exist')});
    res.redirect("/forum.html");
});


app.post('/uploadfile', upload.single('writeup.pdf'), (req, res, next) => {
    const file = req.file;

    if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error)
    }

    res.redirect("writeup.html");
});


app.post('/uploadTable', upload.single('students.xlsx'), (req, res, next) => {
    const file = req.file;

    if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error)
    }

    res.redirect("classroom.html");
});


httpServer.listen(80, function () {
    console.log("Listening on port 80");
});