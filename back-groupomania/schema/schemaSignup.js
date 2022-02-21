"use strict"

const joi = require('joi');
const schemaSignup = joi.object({
        username: joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

        password: joi.string()
        // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

        email: joi.string()
        // .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
        .required(),

        bio: joi.string()       
        .min(5)
        .max(1200),

        // isAdmnin: joi.number().integer()
        

    })




// const joi = require("joi");
// const schemaSignup = joi.object({
//     username : joi.string()
//     .alphanum()
//     .required()
//     .pattern(new RegExp(/[^0-9]/))// ce regex signifie pas de nombre
//     .min(3),//chosir soit min soit max
//      email : joi.string()
//     .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "fr"] } })

    
// })
module.exports = schemaSignup;