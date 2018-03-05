module.exports = (app, passport) => {

  app.get('/', (req, res) => {
    res.render('index');
  });

app.get('/login', (req, res) => {
  res.render('login', {
    message: req.flash('loginMessage')
  });
});

app.post('/login', passport.authenticate('local'));

app.get('/Registrarme', (req, res) => {
  res.render('registrar', {
    message: req.flash('RegistrarmeMessage')
  });
});
app.post('/Registrarme', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/Registrarme',
  failureFlash: true
  }));
  app.get('/profile', (req, res) => {
    res.render('profile', {
      user: req.user
    });
  });
};
