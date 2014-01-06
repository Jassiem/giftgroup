module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    stripeCustomerId: DataTypes.INTEGER,
    pro: DataTypes.BOOLEAN
  });
};