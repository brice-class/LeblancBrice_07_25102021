const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like');
const auth = require ('../middleware/auth');


router.post("/", auth, likeCtrl.likeDislikPost);
router.get("/:id",auth, likeCtrl.getAllTotalLike);


module.exports = router;