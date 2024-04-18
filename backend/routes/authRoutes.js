const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/deleteuser',authMiddleware, authController.deleteuser);
router.post('/updateuser', authMiddleware, authController.updateuser);
router.post('/getuser',   authController.getUser);

module.exports = router;
