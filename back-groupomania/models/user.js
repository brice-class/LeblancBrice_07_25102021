"use strict"

const { Sequelize, sequelize } = require(".")

module.exports = (sequilize, Datatypes)=>{
    const user = sequilize.define(
        "users",{
            id: {
                autoIncrement: true,
                type: Datatypes.SMALLINT,
                allowNull: false,
                primaryKey: true,
              }, 
              email : {
                type :  Datatypes.STRING,
                allowNull: false,
                unique : "email_unique"
              },
              username : {
                type :  Datatypes.STRING,
                allowNull: false,
              },
              password : {
                type :  Datatypes.STRING,
                allowNull: false,
              },
              bio : {
                type :  Datatypes.STRING,
                allowNull: true,                
              },
              isAdmin : {
                type :  Datatypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
              },
              avatar : {
                type :  Datatypes.STRING
              },
              createdAt:{ 
                  type: Datatypes.DATE,
                  defaultValue: Datatypes.literal('NOW()')
              },
              updatedAt:{ 
                  type: Datatypes.DATE,
                  defaultValue: Datatypes.literal('NOW()')
              },


             
              
        }
    )
    return user
}

