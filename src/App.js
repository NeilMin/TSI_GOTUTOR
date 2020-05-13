import React from 'react';
import Geisel from './images/Geisel.jpg'

class Login extends React.Component {
    render() {
        return (
            <html>
            <div className="heroImage">
                <div className="heroText">
                    <h1>GoTutor! by TSI.</h1>
                    <p>The tutor-focused solution.</p>
                    <div className="g-signin2"
                         data-onsuccess={this.onSignIn}
                         data-theme="dark"
                         data-width="300px"/>
                </div>
            </div>

            <div className="footerText">
                <span>This project is considered proprietary software of the following named individuals.</span><br />
                <span>Reproduction of any code or design on this site is prohibited in accordance with the UCSD policy of Academic integrity.</span><br />
                <span>This site should only be referenced for grading the assignment given in CSE 110 by instructor Gary Gillespie.</span><br />
                <span>This software is not intended for use outside of the CSE 110 team. Use at your own caution.</span>
            </div>
            </html>
        );
    }

    onSignIn(googleUser) {
        let userProfile = googleUser.getBasicProfile();
        console.log("onSingIn")
    }
}

function App() {
    ///TODO: Fix this Return
    return (<Login/>);
}

export default App;
