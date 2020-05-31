const login = require('./Login.js');
// Cookie
const cookieSession = require('cookie-session');

// Express
const express = require('express');
const app = express();

// HTTP
const http = require('http');
const httpServer = http.createServer(app);

// MySQL
const mysql = require('mysql');

// Multer
const multer = require('multer');

//SIO
const sio = require("socket.io")(httpServer);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + req.session.uid + '.pdf')
    }
});

const upload = multer({storage: storage});

const cookieSessionMiddleware = cookieSession({
    name: 's',
    secret: 'devel'
});


const con = mysql.createConnection({
    host: "localhost",
    user: "team14dbUser",
    password: "team14TSIdb@user"
});

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


app.use('/', express.static('GOTUTOR_UI'));

app.use(cookieSessionMiddleware);

app.use(function (req, res, next) {
    console.log(req.path + " requested");
    console.log("user id is:" + req.session.uid);
    next();
});

app.get('/fetchAppointments', function (req, res) {
    const sql = "SELECT JSON_ARRAYAGG(JSON_OBJECT('id', id, 'title', title, 'start', start, 'end', end, 'available', available)) FROM Appointment;";
    const result = con.query(sql);
    return JSON.stringify(result);
});

app.post('/googleAuth', login);

app.get('/testUser', function (req, res) {
    req.session.uid = 'test';
    res.redirect("/appointment.html")
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

httpServer.listen(80, function () {
    console.log("Listening on port 80");
});


con.connect(function (err) {
    if (err) throw err;
    const sql = "use GoTutor;";
    con.query(sql);
    console.log("Connected to GoTutor DB!!");
});
