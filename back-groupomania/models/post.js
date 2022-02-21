"use strict";

module.exports = (sequelize, Datatypes) => {
    const Posts = sequelize.define(
      "posts", {
        id: {
            autoIncrement: true,
            type: Datatypes.SMALLINT,
            allowNull: false,
            primaryKey: true,
          }, 
        title: {
            type: Datatypes.STRING(250),
            allowNull: false,
        },
        content: {
            type: Datatypes.TEXT,
            allowNull: false
        },
        images: {
            type: Datatypes.TEXT,
            allowNull: false
        },
        // totalLike:{
        //     type: Datatypes.INTEGER,
        //     allowNull: false,
        //     default: 0
        // },
        // totalDislike:{
        //     type: Datatypes.INTEGER,
        //     allowNull: false,
        //     default: 0
        // }
    
    }
        );
    return Posts;
};