const express = require('express');
const session = require('express-session');
const app = express();
const routerProd = require('./src/routes/produtos');
const mensajesModel = require ('./src/models/mensajesMongo');
const productosModel = require('./src/models/productosMongo');
const UserModel = require('./src/models/usuariosMongo')
const { PORT } = require ('./src/config/globals');
const { TIEMPO_EXPIRACION } = require('./src/config/globals');
const {validatePass} = require('./src/utils/passValidator');
const {createHash} = require('./src/utils/hashGenerator');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/parcial"));

//--INICIAR SESSION
app.use(session({
    secret: 'usuarios',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: parseInt(TIEMPO_EXPIRACION)
    },
    rolling: true,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize())
app.use(passport.session())

//--PASSPORT
passport.use('login', new LocalStrategy(
    //--paramatros user, pass, function callback
    (username, password, callback) => {
        UserModel.findOne({ username: username }, (err, user) => {
            if (err) {
                return callback(err)
            }
            if (!user) {
                console.log('No se encontro usuario');
                return callback(null, false)
            }
            if(!validatePass(user, password)) {
                console.log('Contraseña erronea');
                return callback(null, false)
            }
            return callback(null, user)
        })
    }
));

//--SIGN UP NUEVO USUARIO
passport.use('signup', new LocalStrategy(
    //--Devuelve el Req
    {passReqToCallback: true}, 
    (req, username, password, callback) => {
        UserModel.findOne({ username: username }, (err, user) => {
            if (err) {
                console.log('Hay un error al registrarse');
                return callback(err)
            }

            if (user) {
                console.log('El usuario ya existe');
                return callback(null, false)
            }

            //--TOMO LOS DATOS DEL FRONT
            const newUser = {
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                email: req.body.email,
                username: username,
                password: createHash(password)
            }

            //--CREO EL NUEVO USUARIO
            UserModel.create(newUser, (err, userWithId) => {
                if (err) {
                    console.log('Hay un error al registrarse');
                    return callback(err)
                }

                console.log(userWithId);
                console.log('Registro de usuario satisfactoria');

                return callback(null, userWithId)
            })
        })
    }
));

//--SERIALIZAR 
passport.serializeUser((user, callback) => {
    callback(null, user._id)
});
//--DESERIALIZAR
passport.deserializeUser((id, callback) => {
    UserModel.findById(id, callback)
});


//  INDEX
app.get('/', routerProd.getRoot);

//  LOGIN
app.get('/login', routerProd.getLogin);
app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), routerProd.postLogin);
app.get('/faillogin', routerProd.getFaillogin);

//  SIGNUP
app.get('/signup', routerProd.getSignup);
app.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), routerProd.postSignup);
app.get('/failsignup', routerProd.getFailsignup);

//  LOGOUT
app.get('/logout', routerProd.getLogout);


// PROFILE
app.get('/profile', routerProd.getProfile);

app.get('/ruta-protegida', routerProd.checkAuthentication, (req, res) => {
    res.render('protected')
});

//  FAIL ROUTE
app.get('*', routerProd.failRoute);

const server = app.listen(PORT, () => {
    console.log(`Ir a la página http://localhost:${PORT}`);
});
server.on('error', error => console.log(`Error en el servidor ${error}`))