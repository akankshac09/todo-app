const { DataTypes, Sequelize } = require('sequelize');
const config = require('config');

const sequelize = new Sequelize(
  config.get('db'),
  config.get('dbUser'),
  config.get('dbPassword'),
  {
    dialect: 'mysql',
  },
);
sequelize.sync().then(() => console.log("CONNECTED TO DB"));

const models = {
  bucket: require('./Bucket')(sequelize, DataTypes),
  todoItem: require('./TodoItem')(sequelize, DataTypes),
};

models.bucket.hasMany(models.todoItem);
models.todoItem.belongsTo(models.bucket);

module.exports = models;
