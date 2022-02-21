const Joi = require('joi');

const schemaPost = Joi.object({
    title: Joi.string()
        .required()
        .max(30),

    content: Joi.string()
        .required()
        .min(5)
        .max(1200),

    images: Joi.string()
        .required()
        .min(5)
        .max(1200)    
})

module.exports = schemaPost;