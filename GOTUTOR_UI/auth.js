function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        document.cookie = "";
        sessionStorage.clear()
        localStorage.clear()
        window.location.replace("/login.html")
    });
}

function navigate(toNavigate) {
    const isTutor = sessionStorage.getItem("isTutor") === "true";

    if (toNavigate === 'assignment') {
        if (isTutor) {
            window.location.replace("tutorUI/writeup.html");
        } else {
            window.location.replace("studentUI/writeup.html");
        }
    } else if (toNavigate === 'classroom') {
        if (isTutor) {
            window.location.replace("tutorUI/classroom.html");
        } else {
            window.location.replace("studentUI/classroom.html");
        }
    } else if (toNavigate === 'appointment') {
        if (isTutor) {
            window.location.replace("tutorUI/appointment.html");
        } else {
            window.location.replace("studentUI/appointment.html");
        }
    }
}

gapi.load('auth2', function () {
    var auth2 = gapi.auth2.init({client_id: "294184945438-qev9i7spuki27vk7lo7vs2cjpppi3rk9.apps.googleusercontent.com"}).then(function (auth2) {
        if (!auth2.isSignedIn.get() && !sessionStorage.getItem("testing")) {
            window.location.replace("login.html")
        }
    });

});
