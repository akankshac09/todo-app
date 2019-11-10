const { DATE, INTEGER } = require("sequelize");

module.exports = {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
};
