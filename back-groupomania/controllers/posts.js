const db = require('../models');
const schemaPost = require('../schema/schemaPost');
const { errorJoi } = require('joi');



exports.createPost = async (req, res) => {//next
    try {
        const validate = await schemaPost.validateAsync(req.body);
        if (validate) {
    console.log(req.body);
    const article = {
        title: req.body.title,
        content: req.body.content,
        images: req.body.images,
        userId: req.user.userId
    };
    db.post.create(article)
        .then(() => res.status(201).json({ message: 'post effectuer !' }))
        .catch(error => res.status(400).json({ message: error.message }));
    } else {
        throw error(errorJoi)
      }
    }
    catch (error) { res.status(400).json({ message: error.message }) };
};



exports.getAllPosts =  (req, res) => {
    // console.log(req.user)
    // console.log(req.user.userId)
    db.post.findAll({
        // where: datePost,                
        include: [                                                       
            {model: db.user},
            {model: db.com,include: [{model: db.user,}]},
            {model: db.likeDislike}
       ],            
    
    order: [['createdAt', 'DESC']],
    })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ message: error.message }));
};


exports.getOnePost = (req, res, next) => {
    console.log("get all function");
    db.post.findOne({
        where: {id: req.params.id},

        include: [
             {model:db.user},
             {model:db.com, include: [{model: db.user}]},             
             { model:db.likeDislike },
            ],

            attributes:{ include: [ 
                [ db.Sequelize.literal(`(
                    SELECT SUM(likeVal)
                    FROM likeDislikes
                    WHERE
                    postId = ${req.params.id}
                    )`), 'total_like'],

                [ db.Sequelize.literal(`(
                    SELECT SUM(dislike)
                    FROM likeDislikes
                    WHERE
                    postId = ${req.params.id}
                    )`), 'total_dislike']
            ]}          
       })
       .then(post => res.status(200).json(post))
       .catch(error => res.status(400).json({ message: error.message }));
    };



exports.deletePost = (req, res, next) => {
    
    const postId = req.params.id;// recupere post id via  l'url 
    const userId = req.user.userId;// je recupere l'userId via le token 
    let isAdmin = 0;

    db.user.findOne({// je cherche l'uitilisateur
        where:{id: userId}
    })
    .then((userDb)=>{//si il n'existe pas 
        if(!userDb){
            return res.status(400).json({message: "utilisateur introuvable"})
        }       
        isAdmin = userDb.isAdmin // si il exite on recupere le role 

        return db.post.findOne({// ensuite on cherche le post 
            where: {id: postId}
        })
    })
    .then((postDb)=>{     //  si le post n'existe pas 
        if(!postDb)  {
            return res.status(400).json({message: "post introuvable"})
        }
        if(postDb.userId == userId || isAdmin == 1){ //si il existe on compare l'id avec le createur du post , ou on verifie si l'utilisateur est admin
            return postDb.destroy()
        }
        else {
            return res.status(403).json({ message: "Suppression post non autorisé!!" }) 
        }
    })
    .then(() => res.status(201).json({ message: 'Article supprimé !' }))
    .catch(error => res.status(500).json({ message: error.message }));
};

exports.modifyPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const userId = req.user.userId;
        let isAdmin = 0;
        const validate = await schemaPost.validateAsync(req.body);
               
        if (!validate) {  
            return res.status(400).json({message: "schema incorect"})
        }       
        db.user.findOne({
            where:{id: userId}
        })
        .then((userDb)=>{
            if(!userDb){
                return res.status(400).json({message: "utilisateur introuvable"})
            }       
            return isAdmin = userDb.isAdmin // si il exite on recupere le role 
        })
        .then(()=>{
            return db.post.findOne({// ensuite on cherche le post 
                where: {id: postId}
            })

            .then((postDb)=>{     //  si le post n'existe pas 
                if(!postDb)  {
                    return res.status(400).json({message: "post introuvable"})
                }
                if(postDb.userId == userId || isAdmin == 1){ //si il existe on compare l'id avec le createur du post , ou on verifie si l'utilisateur est admin
                   
                    return postDb.update(
                        {
                            title: req.body.title,
                            content: req.body.content,
                            images: req.body.images
                        },
                    )
                }
                else {
                    return res.status(403).json({ message: "Modification post non autorisé!!" }) 
                }
            })
            .then(() => res.status(201).json({ message: 'Article modifié !' }))
            .catch(error => res.status(500).json({ message: error.message }));
        })
    }catch (error) { res.status(500).json({ message: error.message }) };
}



    