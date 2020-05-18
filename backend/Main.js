const login = require('./Login.js')
// Cookie
const cookieSession = require('cookie-session');

// Express
const express = require('express');
const app = express();

// HTTP
const http = require('http');
const httpServer = http.createServer(app);

const cookieSessionMiddleware=cookieSession({
    name: 's',
    secret: 'devel'
});

var sio = require("socket.io")(httpServer);

sio.use(function(socket,next){
    //console.log(socket.request);
    cookieSessionMiddleware(socket.request,socket.request.res||{},next);
})

sio.on("connection",function(socket){
    socket.on("reserve",(data)=>{
        console.log(data);
        console.log("from"+socket.request.session.uid);
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
    res.json([{
        id: 1,
        title: "tutor",
        daysOfWeek: ['4'],
        startTime: '10:45:00',
        endTime: '12:45:00',
        available: "yes"
    },
    {
        id: 2,
        title: "tutor",
        start:"2020-05-18T10:45:00",
        end: "2020-05-18T12:45:00",
        available: "me",
    }
    ]
    )
})

app.post('/googleAuth', login);


httpServer.listen(80, function () {
    console.log("Listening on port 80");
});