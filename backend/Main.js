process.env.DEBUG = "cookie-session,socket*";
const login = require('./Login.js');
const DUMMY_CLASSROOM = "a";

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
const model = require('./model');

//FS
const fs = require('fs');

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
    //make appointment
    socket.on("reserve", (data, res) => {
        //add Appointment
        console.log(data);
        model.createAppointment(data.question, data.date, socket.request.session.uid, data.id).then(r => {
            console.log("inc" + r.getAutoIncrementValue())
            res(r.getAutoIncrementValue())
        })
        console.log("from " + socket.request.session.uid);
        socket.broadcast.emit('new', data.id);
    })
    socket.on("delete", (data) => {
        console.log(data);
        model.deleteAppointmentById(data.appointmentId);
        socket.broadcast.emit("release", data.officeHourId);
    })
});

sio.of('/forumThread').on('connection', function (socket) {
    model.readForumThread(DUMMY_CLASSROOM, null).then(
        x => {
            socket.emit("oldThread", x)
        }
    );
    socket.on("newThread", (data) => {
        data.userId = socket.request.session.uid;
        model.createForumThread(data.title, data.body, data.userId, DUMMY_CLASSROOM).then(r => {
            data.id = r.getAutoIncrementValue();
            sio.of('/forumThread').emit("otherThread", data);
            console.log(data);
        });
    })
});

sio.of('/forumReply').on('connection', function (socket) {
    socket.on('fetch', (s, fn) => {
        socket.join(String(s));
        model.readForumRepliesByThreadId(s).then(r => {
            console.log(r);
            fn(r)
        });
    });
    socket.on('newReply', (s) => {
        s.userId = socket.request.session.uid;
        console.log(s);
        model.createForumReply(s.reply, s.threadId, s.userId).then(r => {
            s.id = r.getAutoIncrementValue();
            console.log(s);
            sio.of('/forumReply').to(String(s.threadId)).emit('otherReply', s)
        })
    })
});

app.use('/', express.static('GOTUTOR_UI'));

app.use(cookieSessionMiddleware);

app.get('/testUser', function (req, res) {
    req.session.uid = req.query.user;
    model.createUser(req.query.user, 'student', DUMMY_CLASSROOM).catch(e => {
        console.log('already exist')
    });
    var userRole=model.readClassroomByUser(req.query.user).then(r=>{
        if (r.length===0) {
            req.session.role = 'student';
        }else{
            req.session.role=r[0].role;
        }
    })
    userRole.then(r=>{res.redirect("/testLanding.html")});
});
app.post('/googleAuth', login);

app.use(function (req,res,next) {
    if (req.session.uid) {
        next()
    }else{
        res.redirect('login.html');
        console.log(req.url);
    }
})

app.use('/', express.static('GOTUTOR_UI/shared'));

app.use(function (req, res, next) {
    console.log(req.session.role)
    if (req.session.role == "staff") {
        express.static('GOTUTOR_UI/tutorUI')(req, res, next)
    } else {
        express.static('GOTUTOR_UI/studentUI')(req, res, next)
    }
})

app.use(function (req, res, next) {
    console.log(req.path + " requested");
    console.log("user id is: " + req.session.uid);
    next();
});
app.use(express.json())

app.get('/appointmentByOfficeHourId', function (req, res) {
    console.log(req.query.officeHourId);
    model.readAppointmentByOfficeHourId(req.query.officeHourId).then(
        r => {
            res.send(r)
        }
    )
})

app.get('/logout',function (req,res) {
    req.session=null;
    res.redirect('/login.html')
})

app.get('/isTutor', function (req, res) {
    res.send(req.session.role)
})

//Fetch office hours
app.get('/fetchAppointments', function (req, res) {

    console.log(req.session.uid);
    var queries = [
        model.readAvailableOfficeHour(DUMMY_CLASSROOM, null),
        model.readUnavailableOfficeHour(DUMMY_CLASSROOM, null),
        model.readAppointmentByStudentId(DUMMY_CLASSROOM, req.session.uid)
    ];
    Promise.all(queries).then(function (values) {
        res.send({
            available: values[0],
            unavailable: values[1],
            myAppointments: values[2],
            uid: req.session.uid
        })
    })
});

function toSQLTime(date) {
    return date.getHours() + ":" + date.getMinutes() + ":00";
}

app.post('/changeOfficeHour', function (req, res) {
    console.log(req.body)
    var uid = req.session.uid;

    req.body.remove.forEach(e => {
        model.deleteOfficeHourById(e)
    });
    var startTime = new Date()
    var endTime = new Date()
    var newOfficeHours = req.body.add.map(e => {
        startTime.setTime(e.start)
        endTime.setTime(e.end)
        return model.createOfficeHour(uid, DUMMY_CLASSROOM, toSQLTime(startTime), toSQLTime(endTime), startTime.getDay() + 1).then(r => {
            e.id = r.getAutoIncrementValue()
            e.tutorId = uid;
            return e;
        })
    })
    Promise.all(newOfficeHours).then(function (values) {
        res.send("s");
        sio.of('/appointments').emit('changeOfficeHour', {
            removed: req.body.remove,
            added: values
        })
    })
})

app.post('/updateAppointment', function (req, res) {
    console.log(req.body);
    sio.of('/appointments').emit(req.body.status === "approved" ? "approved" : "release", req.body.officeHourId);
    model.updateAppointmentById(req.body.id, req.body.status, null).then(r => {
        console.log(r.getAffectedItemsCount())
        res.send("success");
    })
})


app.post('/uploadfile', upload.single('writeup.pdf'), (req, res, next) => {
    const file = req.file;

    if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error)
    }

    res.redirect("writeup.html");
});


app.post('/alterTutor', (req, res) => {
    console.log(req.body);
    model.updateUser(null, 'student', DUMMY_CLASSROOM).then(function () {
        req.body.forEach(u => {
            model.createUser(u, 'staff', DUMMY_CLASSROOM).catch(function () {
                model.updateUser(u, 'staff', DUMMY_CLASSROOM);
            })
        })
    });
    res.send("");
});
app.get('/fetchTutor',(req,res)=>{
    model.readTutorByClassroom(DUMMY_CLASSROOM).then(r=>{
        console.log(r);
        res.send(r)
    });
})
app.get('/textSuggest', function (req, res) {
    const textBody = req.query.textBody;
    const currentDate = new Date();
    const textName = "suggestions/suggestion-" + req.session.uid + "-" + currentDate.toISOString().slice(0, 19) + ".txt";

    fs.writeFile(textName, textBody, (err) => {
        if (err) throw err;
    });

    res.redirect("setting.html");
});

httpServer.listen(80, function () {
    console.log("Listening on port 80");
});
