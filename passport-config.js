let Strategy = require('passport-local').Strategy
let bcrypt = require('bcrypt')
const squelize = require('sequelize')
let passport = require('passport')
let User = require('./models/Users')
function initialize() {


    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        // const project = await Project.findOne({ where: { title: 'My Title' } });
        // if (project === null) {
        // console.log('Not found!');
        // } else {
        // console.log(project instanceof Project); // true
        // console.log(project.title); // 'My Title'
        // }
        const user = await User.findOne({ where: { id: id } });
        
        return done(null, user);
       
    
    })
    passport.use(new Strategy(async function (username, password, done) {
        const user = await User.findOne({ where: { username: username } });
        console.log(username);
        console.log(password);
        console.log(user);
        // if(err){ return done(err)}
        if (!user) {
            return done(null, false, { message: 'incorect' })
        }
        if (user == null) {
            return done(null, false, { message: 'Incorect Credential' })
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Incorect Credential' })
            }
        } catch (error) {
            return done(error)
        }
    
    }))
}



module.exports = initialize