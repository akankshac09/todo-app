const BaseModel = require('./BaseModel');

module.exports = function(sequelize, DataTypes) {
  const todoItem = sequelize.define('todoItem', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ...BaseModel,
  });
  return todoItem;
}
