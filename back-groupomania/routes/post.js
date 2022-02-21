const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/posts');
const auth = require ('../middleware/auth');

router.get('/:id', auth, postCtrl.getOnePost);
router.get('/',auth, postCtrl.getAllPosts);
router.post('/',auth, postCtrl.createPost);
router.delete('/delete/:id', auth, postCtrl.deletePost);
router.put('/modify/:id', auth, postCtrl.modifyPost);

module.exports = router;