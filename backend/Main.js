const express = require('express');
const http = require('http');
const cookieSession = require('cookie-session')
var app = express();
var httpServer = http.createServer(app);
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID="294184945438-apd7ktfqguua67c4u06oq69sajq7nteq.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

app.use(function(req,res,next){
    console.log(req.path+"requested");
    next();
})




app.use(cookieSession({
    name: 's',
    secret: 'devel'
}));

app.get('/Success.html',function(req,res,next){
    console.log(req.session.uid);
    next();
})
app.use('/',express.static('old_site'));

app.post('/googleAuth',function(req,res){
    let buffer="";
    req.on('data',chunck=>{buffer+=chunck;});
    req.on('end',async()=>{
        //https://developers.google.com/identity/sign-in/web/backend-auth
        try {
            const ticket = await client.verifyIdToken({
                idToken: buffer,
                audience: CLIENT_ID,  
            });
            const payload = ticket.getPayload();
            //console.log(payload);
            if (payload['hd']!=='ucsd.edu') {
                console.log(payload['hd'])
                res.send(JSON.stringify({success:false,failedReason:"Please log in with UCSD google account"}));
                return;
            }
            req.session.uid=payload['sub'];
            req.sessionOptions.maxAge=payload['exp']*1e3-Date.now();
            res.send(JSON.stringify({success:true,
                userInfos:(({name,email,picture})=>({name,email,picture}))(payload)}));
        } catch (error) {
            console.log(error);
            res.send(JSON.stringify({success:false,failedReason:error}));
        }
    })
});


httpServer.listen(80, function(){
    console.log("Listening on port 80");
});