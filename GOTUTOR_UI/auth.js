function signOut() {
    try{
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        sessionStorage.clear();
        localStorage.clear();
        window.location.replace("/logout")
    });
}
finally{
    sessionStorage.clear();
    localStorage.clear();
    window.location.replace("/logout")
}
}
gapi.load('auth2', function () {
    var auth2 = gapi.auth2.init({client_id: "294184945438-qev9i7spuki27vk7lo7vs2cjpppi3rk9.apps.googleusercontent.com"}).then(function (auth2) {
        if (!auth2.isSignedIn.get() && !sessionStorage.getItem("testing")) {
            window.location.replace("login.html")
        }
    });

});
