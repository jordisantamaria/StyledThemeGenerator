"use strict";
//Add all models and sequelize on a single object

let config = require(__dirname + "/../config/config.js");

let fs = require("fs");
let path = require("path");
let Sequelize = require("sequelize");
let basename = path.basename(__filename);
let env = process.env.NODE_ENV || "development";
let db = {};
let sequelize;

if (config.use_env_variable) {
  console.log("created bd postgress de heroku");
  sequelize = new Sequelize(config.use_env_variable);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    let model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
