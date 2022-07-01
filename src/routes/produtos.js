
//--DIRECCION MAIN
function getRoot(req, res) {
    res.render('index')
}
//--DIRECCION LOG IN
function getLogin(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('profileUser')
    } else {
        res.render('logInForm');
    }
}
//--DIRECCION SIGN UP
function getSignup(req, res) {
    res.render('sign-up');
}
//--DIRECCION DESPUES DE LOG IN
function postLogin (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('profileUser')
    } else {
        res.redirect('logInForm')
    }
}
//--DIRECCION DESPUES DE SIGN IN
function postSignup (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('profileUser')
    } else {
        res.redirect('logInForm')
    }
}
//--DIRECCION DEL PERFIL
function getProfile (req, res) {
    if (req.isAuthenticated()) {
        let user = req.user;
        res.render('profileUser', { user: user, isUser:true })
    } else {
        res.redirect('logInForm')
    }
}
//--DIRECCION DE FALLA LOG IN
function getFaillogin (req, res) {
    console.log('error en login');
    res.render('log-in-err', {});
}
//--DIRECCION DE FALLA SIGN IN
function getFailsignup (req, res) {
    console.log('error en signup');
    res.render('sign-up-err', {});
}

//--DIRECCION DE LOG OUT
function getLogout (req, res) {
    req.logout( (err) => {
        //--logout -> metodo propio de passport
        if (!err) {
            res.render('index');
        } 
    });
}
//--DIRECCION DE ERROR 
function failRoute(req, res){
    res.status(404).render('routing-err', {});
}
//--AUTENTICACION DE USUARIO
function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else {
        res.redirect("/logInForm");
    }
}

module.exports = {
    getRoot,
    getLogin,
    postLogin,
    getFaillogin,
    getLogout,
    failRoute,
    getSignup,
    postSignup,
    getFailsignup,
    checkAuthentication,
    getProfile
}