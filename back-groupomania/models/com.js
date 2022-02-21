"use strict";

module.exports = (sequelize, Datatypes) => {
    const Com = sequelize.define("coms", {

        content: {
            type: Datatypes.TEXT,
            allowNull: false
        },

      /*   postId:{ // on cascade au mauvais endroit
            allowNull: false,
            type: Datatypes.SMALLINT,
           },
       
        userId:{
            allowNull: false,
            type: Datatypes.SMALLINT,
           } */

    });

    return Com;
};