"use strict"

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../models');
const schemaSignup = require("../schema/schemaSignup")
const schemaLogin = require("../schema/schemaLogin")
const schemaProfile = require("../schema/schemaProfile")
const { errorJoi } = require('joi');//rajouté pour les erreur joi 
const fs = require("fs");

const cryptoJS = require('crypto-js');
const user = require("../models/user");
// Clé secrète pour l'email
const key = cryptoJS.enc.Hex.parse(process.env.SIGNATURE);
// Initialiser le vecteur
const iv = cryptoJS.enc.Hex.parse(process.env.SIGNATURE);
// Chiffrer l'email
const encryptEmail = (string) => {
    return cryptoJS.AES.encrypt(string, key, {iv: iv}).toString();
};
const decryptEmail = (string) => {
  let decrypted =  cryptoJS.AES.decrypt(string, key, {iv: iv});
  let decryptEmail = cryptoJS.enc.Utf8.stringify(decrypted);
  return decryptEmail;
};


 // inscription User
exports.signup = async (req, res, next) => {// 1)verification des données du front 2)traitement des données 3)echange avec la bdd 4 ) reponse du server
  try{

     // init image avatar
    

    const user = {
      username : req.body.username,
      email: encryptEmail(req.body.email),
      password: req.body.password,
      bio: req.body.bio ,
      // isAdmin: req.body.isAdmin,
      // avatar : `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
    }
  
    const isValid = await schemaSignup.validateAsync(user)// verifit que user correspond au schema
  
    if (!isValid){ // ! = différent de ce que tu attends
        return res.status(400).json ({'error' : "missing parameters"}); // ou {message : error.message}
    }
    
    db.user.findOne({ where : {email: user.email}})
    .then((validateEmail)=>{// je donne un nom a mon resultat
      if(validateEmail){
      return res.status(401).json({ error: 'email existe deja!' });
    }
       return bcrypt.hash(user.password, 10)
    })
    .then(hash => {
      
        user.password = hash   
      
      return db.user.create(user)
    
    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
    .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
  }
  catch(err){
    res.status500.json({err})
    console.log(req.body)
  }
};
//Connection User

exports.login = async (req, res, next) => {
  try {  
    const userLog = {
      email: req.body.email, 
      password: req.body.password
    }
    const isValidLog = await schemaLogin.validateAsync(userLog);
    if (isValidLog) {
      db.user.findOne({ where : {email: encryptEmail(req.body.email)}}) //db=chercher dans la base de donnée, .user == choix de la table.
      .then(user => {
        console.log(user.dataValues)
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user.id,
              username: user.username,
              mail: user.email,
              bio: user.bio,
              isAdmin: user.isAdmin,
             
              token: jwt.sign(
                  {
                    userId: user.id,
                    isAdmin: user.isAdmin
                  },
                  process.env.SIGNATURE,
                  { expiresIn: '24h' }
                )
            });
          })
          .catch(error => res.status(401).json({ error : 'veuillez verifier les parametres user' }));
      })
      .catch(error => res.status(500).json({ error }));
    }else {
      throw error(invalid)
    }
  }

catch (error) {
  console.log(error);
  return res.status(400).json({ error })
  };
};


//supression User
exports.deleteUser = (req, res, next) => {

  // const token = req.headers.authorization.split(' ')[1];
  // const decodedToken = jwt.verify(token, process.env.SIGNATURE);
  // const isAdmin = decodedToken.isAdmin;
  
  
  const userIdToken = req.user.userId;
  const userId = req.params.id;
  let isAdmin = 0

  db.user.findOne({// je cherche l'uitilisateur
    where:{id: userIdToken}
})

.then((userTokenDb)=>{//si il n'existe pas 
    if(!userTokenDb){
        return res.status(400).json({message: "utilisateur introuvable"})
    }       
    isAdmin = userTokenDb.isAdmin // si il exite on recupere le role 


    if(userIdToken == userId || isAdmin == 1){
      return db.user.findOne({
        where: { id: userId }
      })}
      else { res.status(403).json({ message: "Suppression d'utilisateur non autorisé!!" }) }
    })
      .then((userDb) => {
        const filename = userDb.avatar.split("/images/")[1];
                fs.unlink(`images/${filename}`, (err) => {
                  if (err) {
                    return console.log(err);
                  } else {
                    console.log("image supprimée !");
                  }})
        userDb.destroy({
          where: { id: userId }
        })
      })
      .then(() => res.status(200).json({ message: 'Profil supprimé !' }))
      .catch(error => res.status(500).json({ message: error.message }));// a changer par le message d'erreur
     
    };
  


//modification user  
exports.modifyUser = async (req, res, next) => {

  // const token = req.headers.authorization.split(' ')[1];
  // const decodedToken = jwt.verify(token, process.env.SIGNATURE);
  const userIdToken = req.user.userId;
  const userId = req.params.id;

  if(userIdToken != userId){
    res.status(403).json({message: "action non authorisé! " })
  }  
      let image = "";
        try{
          image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        }
        catch(error){
          console.log(error);
        }
        
        db.user.findOne({where: {
          id: req.params.id,
        }}).then( userdb => {
          if(!userdb){
            return res.status(400).json({message: "utilisateur introuvable"})
        };     
        if(req.file){
          const filename = userdb.avatar.split("/images/")[1];
                  fs.unlink(`images/${filename}`, (err) => {
                    if (err) {
                      return console.log(err);
                    } else {
                      console.log("image supprimée !");
                    }})

        };
        let userNew = JSON.parse(req.body.user);
          return userdb.update(
            {
              mail: userNew.email,
              username: userNew.username,
              bio: userNew.bio,
              avatar : image
            })          
          }
          )
          .then(() => res.status(201).json({ message: 'profil modifié !' }))                
        .catch (error => { res.status(500).json({message: error.message }) })
  
};

exports.getOneUser = (req, res, next) => {
  db.user.findOne({
    where: {
      id: req.params.id,
    }
  })
    .then(user => { user.email =  decryptEmail(user.email);
      res.status(200).json({
      /*
        mail: decryptEmail(user.email),
        username: user.username,
        bio: user.bio,
        userId: user.id,*/
        user
        
      })
    }
    )
    .catch(error => res.status(404).json({ message: error.message }));
};
