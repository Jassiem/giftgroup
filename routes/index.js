exports.index = function() {
  return function(req, res){
    res.render('index');
  };
};

exports.partials = function (req, res) {
  var name = req.params.name;
  console.log(name);
  if (name === 'login' || name === 'home' || name === 'signup') {
    res.render('partials/' + name);
  } else {
    // require authentication
    if (req.session.user) {
      console.log('accepted');
      res.render('partials/' + name);
    } else {
      console.log('denied');
      req.session.error = 'Access denied!';
      res.redirect('partials/login');
    }
  }

};