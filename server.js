
let express = require('express')
const session = require('express-session')
let app = express()
let bcrypt = require('bcrypt')
let passport = require('passport')
// const bodyparser = require('body-parser')
const flash = require('express-flash')
let Strategy = require('passport-local').Strategy
const sequelize = require('./config/db')
app.set('view engine', 'ejs')

let User = require('./models/Users')
app.use(express.json())
app.use('/assets', express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: "verygoodsecret",
    resave: false,
    saveUninitialized: true
}))


//passport
const initializePassport = require('./passport-config')
initializePassport()
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// sequelize.sync()



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}

app.get('/', isLoggedIn, (request, response) => {
    console.log("toto");
    response.render('pages/index', { title: 'Index' })
})

app.get('/login', (request, response) => {

    response.render('pages/login', { title: 'Login' })
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))
app.get('/register', (request, response) => {

    response.render('pages/register', { test: 'salut' })
})
app.get('/edit/intervention', isLoggedIn, (request, response) => {

    response.render('pages/editIntervention', { test: 'salut' })
})






app.get('/setup', async (req, res) => {
    const exists = await User.findOne({ where: { username: 'admin' } });

    if (exists) {
        res.redirect('/login');
        return;
    };

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash("pass", salt, function (err, hash) {
            if (err) return next(err);

            const newAdmin = new User({
                username: "admin",
                firstName: "admin",
                lastName: "admin",
                email: "admin@example.com",
                password: hash
            });

            newAdmin.save();

            res.redirect('/login');
        });
    });
});

app.listen(8080)