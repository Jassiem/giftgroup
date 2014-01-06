/**
 * Module dependencies.
 */

var routes = require('./routes'),
  ajax = require('./routes/ajax'),
  express = require('express');

var app = module.exports = express();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('models', require(__dirname + '/models')); // supposedly singleton-esque way to access models
  app.set('view engine', 'jade');
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'asdvNSDKL2340secret203nvdslksJDns' }));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index());
app.get('/partials/:name', routes.partials);
app.get('/logout', ajax.logout());

// posts
app.post('/login', ajax.login());

// redirect all others to the index (HTML5 history)
app.get('*', routes.index());

// Start server
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
