const express = require('express');
const router = express.Router();
const auth = require ('../middleware/auth');
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer');

router.post('/signup',  userCtrl.signup);
router.post('/login', userCtrl.login);

router.delete('/delete/:id', auth, userCtrl.deleteUser);
router.put('/modify/:id', auth, multer, userCtrl.modifyUser);
router.get('/:id', userCtrl.getOneUser);

module.exports = router;