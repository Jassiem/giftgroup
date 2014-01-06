var Sequelize = require('sequelize');
var sequelize;

if (process.env.NODE_ENV == 'production') {
  // the application is executed on Heroku ... use the postgres database
  var match = process.env.HEROKU_POSTGRESQL_MAROON_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);

  sequelize = new Sequelize(match[5], match[1], match[2], {
    dialect:  'postgres',
    protocol: 'postgres',
    port:     match[4],
    host:     match[3],
    logging:  true, //false,
    omitNull: true
  });
} else {
  sequelize = new Sequelize('ds_tools', 'node_user', 'node', {
    dialect: 'postgres',
    host: "localhost",
    port: 5432,
    omitNull: true
  });
}

// load models
var models = [
  'DroppedDomain',
  'User'
];

models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// export connection
module.exports.sequelize = sequelize;
