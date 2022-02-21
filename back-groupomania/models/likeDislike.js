"use strict";

module.exports = (sequelize, Datatypes) => {
    const likeDislike = sequelize.define(
      "likeDislike", {
        
        likeVal:{//1 = like 0 = neutre -1 = dislike
            type: Datatypes.INTEGER,
            defaultValue: 0,
        },
        dislike:{
            type: Datatypes.INTEGER,
            defaultValue: 0,
        }
        
    }
);
    return likeDislike;
};
// "likes", {
//     postId: {           
//         type: Datatypes.INTEGER,
//         references:{
//             model: 'posts',
//             key: 'id'
//         }            
//       }, 
//     userId: {
//         type: Datatypes.INTEGER,
//         references: {
//             model : 'users',
//             key: 'id'
//         }
//     },