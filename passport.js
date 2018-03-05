var LocalStrategy = require('passport-local').Strategy;

var User = require('../routes/users');

module.exports = function (passport) {
  passport.serializeUser(function (user, done){
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done){
    User.findById(id, function (err, user){
      done(err, user);
    });
  });
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
function (req, email, password, done) {
  User.findOne({'local.email': email}, function (err, user){
    if (err) { return done(err); }
    if (user){
      return done(null, false, req.flash('RegistrarmeMessage', 'El email ya está en uso.'));
    } else {
      var newUser = new User();
      newUser.local.email = email;
      newUser.local.password = newUser.generateHash(password);
      newUser.save(function (err){
        if (err) {throw err;}
        return done(null, newUser);
      });
    }
  })
}));

//login
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
function (req, email, password, done) {
User.findOne({'local.email': email}, function (err, user){
  if (err) { return done(err); }
    if (!user) {
  return done(null, false, req.flash('loginMessage', 'No se ha encontrado el usuario.'));
}
if (!user.validatePasswrod(password)) {
  return done(null, false, req.flash('loginMessage', 'Contrasea escrita incorrectamente'));
}
return done(null, user);
})
}));
}
