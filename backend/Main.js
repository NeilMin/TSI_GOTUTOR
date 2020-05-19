// Cookie
const cookieSession = require('cookie-session');

// Express
const express = require('express');
const app = express();

// HTTP
const http = require('http');
const httpServer = http.createServer(app);

// Google Authentication
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = "294184945438-qev9i7spuki27vk7lo7vs2cjpppi3rk9.apps.googleusercontent.com";
const googleClient = new OAuth2Client(CLIENT_ID);

app.use(function (req, res, next) {
    console.log(req.path + " requested");
    next();
});

app.use(cookieSession({
    name: 's',
    secret: 'devel'
}));

app.get('/appointment.html', function (req, res, next) {
    console.log(req.session.uid);
    next();
});

app.use('/', express.static('GOTUTOR_UI'));

app.post('/googleAuth', function (req, res) {
    let buffer = "";
    req.on('data', chunk => {
        buffer += chunk;
    });
    req.on('end', async () => {
        // Reference: https://developers.google.com/identity/sign-in/web/backend-auth
        try {
            // No need to verify if the account is UCSD as the API is configured to only
            // allow accounts that belong to the UCSD organization.
            const ticket = await googleClient.verifyIdToken({
                idToken: buffer,
                audience: CLIENT_ID,
            });

            // Get user information and put into JSON
            const payload = ticket.getPayload();
            req.session.uid = payload['sub'];
            req.sessionOptions.maxAge = payload['exp'] * 1e3 - Date.now();
            res.send(JSON.stringify({
                success: true,
                userInfos: (({name, email, picture}) => ({name, email, picture}))(payload)
            }));
        } catch (error) {
            console.log(error);
            res.send(JSON.stringify({success: false, failedReason: error}));
        }
    })
});


httpServer.listen(80, function () {
    console.log("Listening on port 80");
});