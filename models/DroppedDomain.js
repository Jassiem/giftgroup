module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DroppedDomain', {
    domain: DataTypes.STRING,
    tld: DataTypes.STRING,
    droppedAt: DataTypes.DATE
  });
};