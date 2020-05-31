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

// MySQL
//const mysql = require('mysql');

// Multer
const multer = require('multer');

// SIO
const sio = require("socket.io")(httpServer);

//Database
const model=require('./model');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + req.session.uid + '.pdf');
    }
});

const upload = multer({storage: storage});

const cookieSessionMiddleware = cookieSession({
    name: 's',
    secret: 'devel'
});
/*
const con = mysql.createConnection({
    host: "localhost",
    user: "team14dbUser",
    password: "team14TSIdb@user"
});
*/
sio.use(function (socket, next) {
    //console.log(socket.request);
    cookieSessionMiddleware(socket.request, socket.request.res || {}, next);
});

sio.on("connection", function (socket) {
    socket.on("reserve", (data) => {
        console.log(data);
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
            sio.of('/forumThread').emit("otherThread",data)
            console.log(data);
        });
    })
})

app.use('/', express.static('GOTUTOR_UI'));

app.use(cookieSessionMiddleware);

app.use(function (req, res, next) {
    console.log(req.path + " requested");
    console.log("user id is:" + req.session.uid);
    next();
});

app.get('/fetchAppointments', function (req, res) {

});

app.post('/googleAuth', login);

app.get('/testUser', function (req, res) {
    req.session.uid = req.query.user;
    res.redirect("/forum.html");
});


app.post('/uploadfile', upload.single('writeup'), (req, res, next) => {
    const file = req.file;

    if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error)
    }

    res.send(file);
});

app.post('/postThread', upload.single('title'), upload.single('body'), (req, res, next) => {
    const threadTitle = req.title;
    const threadBody = req.body;

    if (!threadTitle || !threadBody) {
        const error = new Error('Please complete forum post');
        error.httpStatusCode = 400;
        return next(error)
    }

    res.redirect("/forum.html");
});

httpServer.listen(80, function () {
    console.log("Listening on port 80");
});
/*
con.connect(function (err) {
    const sql = "use team14db;";
    con.query(sql);
});
*/