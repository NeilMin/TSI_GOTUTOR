// Google Authentication
const DUMMY_CLASSROOM="a";
const {OAuth2Client} = require('google-auth-library');

const CLIENT_ID = require('./CLIENT_ID');
const googleClient = new OAuth2Client(CLIENT_ID);
const model=require('./model');

module.exports=function (req, res) {
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
            var UID=payload['email'];
            UID=UID.substr(0,UID.indexOf('@'));
            req.session.uid = UID;
            var userRole=model.readClassroomByUser(UID).then(r=>{
                if (r.length===0) {
                    req.session.role = 'student';
                }else{
                    req.session.role=r[0].role;
                }
            })
            model.createUser(UID,'student',DUMMY_CLASSROOM).catch(e=>{console.log('already exist')});
            req.sessionOptions.maxAge = payload['exp'] * 1e3 - Date.now();
            req.sessionOptions.httpOnly = false;
            userRole.then(function(){res.send(JSON.stringify({
                success: true,
                userInfos: (({name, email, picture}) => ({name, email, picture}))(payload)
            }));})
        } catch (error) {
            console.log(error);
            res.send(JSON.stringify({success: false, failedReason: error}));
        }
        
    })
};

