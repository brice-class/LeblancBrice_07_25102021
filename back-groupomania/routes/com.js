const express = require('express');
const router = express.Router();
const comCtrl = require('../controllers/com');
const auth = require ('../middleware/auth');

//router.get('/:id', auth, comCtrl.getOneCom);
router.get('/:id', auth, comCtrl.getAllComs);
router.post('/', auth, comCtrl.createCom);
router.delete('/delete/:id', auth, comCtrl.deleteCom);
router.put('/modify/:id', auth, comCtrl.modifyCom);



module.exports = router;