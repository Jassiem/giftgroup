// attempt a login
exports.login = function() {

  /*
   data: {
    login: 'success' or 'fail'
    message: server side login error message
   }
  */

	return function(req, res){
    var formData = req.body;
    if (formData.email === 'john@gmail.com' && formData.password === 'testpass') {
      req.session.regenerate(function(){
          req.session.user = formData.email;
        });
      res.json({
        login: 'success',
        message: 'successful login'
      });
    } else {
      res.json({
        login: 'fail',
        message: 'username or password is invalid'
      });
    }
  };
};

// log out and redirec to home
exports.logout = function() {
  return function(req, res){
    req.session.destroy(function(){
      res.redirect('/');
    });
  };
};

// ensure logged in
exports.restrict = function() {
  return function(req, res){
    if (req.session.user) {
      next();
    } else {
      req.session.error = 'Access denied!';
      res.redirect('/login');
    }
  };
};