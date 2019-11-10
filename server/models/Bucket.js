const BaseModel = require('./BaseModel');

module.exports = function(sequelize, DataTypes) {
  const bucket = sequelize.define('bucket', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ...BaseModel
  });
  return bucket;
}
