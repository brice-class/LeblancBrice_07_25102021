const Joi = require('joi');

const schemaCom = Joi.object({
    content: Joi.string()
        .required()
        .min(3)
        .max(600),

        postId: Joi.number()
        .required()
        
})

module.exports = schemaCom;