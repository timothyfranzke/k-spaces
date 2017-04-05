loginApp.controller('login-controller', function(loginFormService){
    loginFormService({url:'http://localhost:3000/api/login'});
});