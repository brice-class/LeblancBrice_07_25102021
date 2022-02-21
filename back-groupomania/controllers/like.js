const db = require('../models');

exports.likeDislikPost = async(req, res, next) => {//idée si l'id user n'est pas présent likeDislike = +1
  //trouvé le post si il existe
  //voir si l'utilisateur a deja liké, si il est present dans la table
  //si il exist pas je le créé, sinon pdate la table likeDislike
  try {
    const postDb = await db.post.findOne({where: { id: req.body.postId,},})
    if(!postDb){
      return res.status(400).json({message : "le post n'existe pas"})
    }
    const likeDb = await db.likeDislike.findOne({where: {userId: req.user.userId, postId: req.body.postId},})
    const user = {
      postId : req.body.postId,
      userId : req.user.userId,
      likeVal : 0, 
      dislike : 0
    }
    switch(req.body.likeVal){
      case 1 : user.likeVal = 1  //en cas de soucis , passer le case 1 en case "1"
      break;
      case -1: user.dislike = 1 
      break;
      case 0 : if(likeDb){
         return likeDb.destroy()
         .then( () => {res.status(200).json({message : "destruction effectuer"})})
         .catch( (error) => {res.status(500).json(error)} )
      }
      break;
      default : return res.status(400).json({message : "erreur de donnée"})
        
    }
    
    if(!likeDb){
      return db.likeDislike.create(user)
      .then( () => {res.status(201).json({message : "donnée créé"})})
      .catch( (error) => {res.status(500).json(error)} )
    }
    likeDb.update({
      likeVal : user.likeVal,
      dislike : user.dislike
    })
    .then( () => {res.status(200).json({message : "modifié"})})
    .catch( (error) => {res.status(500).json(error)} )

  }catch(error){
      return res.status(500).json(error.message)
  }
}


exports.getAllTotalLike = (req, res) => {
    db.likeDislike.findAll({
      where: {postId: req.params.id},
      attributes: [[db.Sequelize.fn('SUM', db.Sequelize.col('likeVal')), 'total_like']],
      raw: true
  
      
  }) 

  .then( (totalLike) => {res.status(200).json(totalLike)})
  .catch( (error) => {res.status(500).json(error)} )

}

// exports.getAllLikeDislike