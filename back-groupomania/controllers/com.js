const db = require('../models');
const fs = require('fs');
const schemaCom = require('../schema/schemaCom');
const { invalid } = require('joi');
//test
// exports.getOneCom = (req, res, next) => {
//     db.com.findOne({
//         where: {
//             id: req.params.id,
//         },
//         include: [{
//             model: db.user,
//             as: 'user',
//             attributes: ["username"]
//         }]
//     })
//         .then(com => res.status(200).json(com))
//         .catch(error => res.status(400).json({ message: error.message }));
// };

exports.getAllComs = (req, res, next) => {
    console.log("\ncoucou com\n");
    const postId = req.params.id;
    db.com.findAll({
        where: {postId:postId},
        order: [['createdAt', 'DESC']],
        include: [ {
            model: db.user
        }]
    })
        .then(com => res.status(200).json(com))
        .catch(error => res.status(400).json({ message: error.message }));
};

exports.createCom = async (req, res, next) => {
    try {
        const valid = await schemaCom.validateAsync(req.body);
    
        if (valid) {
    const comObject = {
        content: req.body.content,
        userId: req.user.userId,       
        postId: req.body.postId,
    };
    db.com.create(comObject)
        .then((commentaires) => {
           return res.status(201).json({data: commentaires.dataValues})
           
        })
        
        .catch(error => res.status(400).json({message: error.message }));
    } else {
        throw error(invalid)
      }
    }
    catch (error) { res.status(400).json({ message: error.message }) };
};

exports.deleteCom = (req, res, next) => {
    const comId = req.params.id;
    db.com.destroy({
        where: {
            id: comId,
        }
    })
        .then(() => res.status(201).json({ message: 'Commentaire supprimé !' }))
        .catch(error => res.status(400).json({ message : error.message }));
};

exports.modifyCom = (req, res, next) => {
    const comId = req.params.id;
    const userId = req.user.userId;
    const contentModify = req.body.content;
    db.com.update(
        { content: contentModify },
        {
            where: {
                id: comId,
                userId: userId
            }
        })
        .then(() => res.status(201).json({ message: 'Commentaire modifié !' }))
        .catch(error => res.status(400).json({ message: error.message }));
};