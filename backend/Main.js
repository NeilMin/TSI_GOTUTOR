const login = require('./Login.js');
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

const sio = require("socket.io")(httpServer);

sio.use(function (socket, next) {
    //console.log(socket.request);
    cookieSessionMiddleware(socket.request, socket.request.res || {}, next);
});

sio.on("connection", function (socket) {
    socket.on("reserve", (data) => {
        console.log(data);
        console.log("from" + socket.request.session.uid);
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
    res.json([{
            id: 1,
            title: "tutor",
            start: "2020-05-30T10:45:00",
            end: "2020-05-30T12:45:00",
            available: "yes"
        },
            {
                id: 2,
                title: "tutor",
                start: "2020-05-28T10:45:00",
                end: "2020-05-28T12:45:00",
                available: "yes",
            }
        ]
    )
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
