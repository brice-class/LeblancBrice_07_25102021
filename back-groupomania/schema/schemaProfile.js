"use strict"

const joi = require('joi');
const schemaProfile = joi.object({
        username: joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

       bio: joi.string()
       .required()
       .min(5)
       .max(1200),

        email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
        .required(),

    })

    module.exports = schemaProfile;