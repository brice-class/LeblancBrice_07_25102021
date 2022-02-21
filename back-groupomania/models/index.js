"use strict";

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB,
  process.env.USERS,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
    operatorsAliases: 0,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const db = {};//

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user")(sequelize,Sequelize)//
db.post = require("./post")(sequelize,Sequelize);
db.com = require("./com")(sequelize, Sequelize);
db.likeDislike = require("./likeDislike")(sequelize, Sequelize);


//RELATION USER => post et commentaire
db.user.hasMany(db.post, {foreignKey: 'userId', onDelete: "cascade", hooks: true});
db.user.hasMany(db.com, {foreignKey: 'userId',  onDelete: "cascade"});

//RELATION post => commentaire , like dislike 
db.post.belongsTo(db.user, {foreignKey:{name:'userId', allowNull: false}});
db.post.hasMany(db.com, {foreignKey: 'postId', onDelete: "cascade"});

//RELATION commentaire => post , user
db.com.belongsTo(db.post);
db.com.belongsTo(db.user,  {foreignKey:{name:'userId', allowNull: false}});

db.user.hasMany(db.likeDislike, {foreignKey: 'userId',  onDelete: "cascade"});
db.likeDislike.belongsTo(db.user, {foreignKey:{name:'userId', allowNull: false}});

db.post.hasMany(db.likeDislike, {foreignKey: 'postId',  onDelete: "cascade"});
db.likeDislike.belongsTo(db.post, {foreignKey:{name:'postId', allowNull: false}});

module.exports = db;