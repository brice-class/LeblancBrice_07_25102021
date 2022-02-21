"use strict"
const joi = require("joi");
const schemaLogin = joi.object({
    
     email : joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "fr"] } })
    .required(),
    password : joi.string()
    // .alphanum()// on autorise lettre et chiffres
    .required()//le username est requis
    // .pattern(new RegExp(/[^0-9]/))// ce regex signifie pas de nombre
    .min(3),//chosir soit min soit max

    
})
module.exports = schemaLogin;