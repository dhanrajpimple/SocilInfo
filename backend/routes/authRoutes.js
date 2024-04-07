const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/deleteuser', authController.deleteuser);
router.post('/updateuser', authController.updateuser);

module.exports = router;
